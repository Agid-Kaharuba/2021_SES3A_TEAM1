using System;
using UnityEngine;
using Valve.VR.InteractionSystem;


[RequireComponent(typeof(Interactable))]
public class XRHorizontalTranslater : MonoBehaviour
{
    [SerializeField] private GameObject baseObject;
    [SerializeField] private LineRenderer lineRenderer;
    
    private Interactable interactable;
    private Vector3 toBaseVector;
    private float targetY;

    private void Awake()
    {
        interactable = GetComponent<Interactable>();
        toBaseVector = baseObject.transform.position - transform.position;
    }

    private void HandHoverUpdate(Hand hand)
    {
        GrabTypes startingGrabType = hand.GetGrabStarting();
        bool isGrabEnding = hand.IsGrabEnding(gameObject);

        if (hand.currentAttachedObject == null && startingGrabType != GrabTypes.None)
        {
            hand.HoverLock(interactable);
            hand.AttachObject(gameObject, startingGrabType, Hand.AttachmentFlags.DetachOthers | Hand.AttachmentFlags.DetachFromOtherHand);
            targetY = baseObject.transform.position.y;
        }
        else if (isGrabEnding)
        {
            hand.DetachObject(gameObject);
            hand.HoverUnlock(interactable);

            if (lineRenderer != null)
            {
                lineRenderer.positionCount = 0;
            }
        }
    }

    private void HandAttachedUpdate(Hand hand)
    {
        Vector3 handForwardVector = hand.transform.forward;
        handForwardVector.y = 0f;
        Quaternion baseRotation = Quaternion.LookRotation(handForwardVector, Vector3.up);
        baseObject.transform.rotation = baseRotation;
        
        Vector3 basePosition = hand.hoverSphereTransform.position + baseObject.transform.rotation * toBaseVector;
        basePosition.y = targetY;

        baseObject.transform.position = basePosition;

        // Render the line
        if (lineRenderer != null)
        {
            lineRenderer.positionCount = 2;
            lineRenderer.SetPositions(new [] {transform.position, hand.hoverSphereTransform.position});
        }
    }
}
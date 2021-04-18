using System;
using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using Valve.VR.InteractionSystem;

[RequireComponent(typeof(Interactable)), RequireComponent(typeof(Rigidbody))]
public class BurgerItem : MonoBehaviour
{
    [SerializeField] private BurgerStackDetector stackDetector;
    [SerializeField] private Transform stickPoint;
    [SerializeField] private Hand.AttachmentFlags attachmentFlags = Hand.AttachmentFlags.DetachOthers |
                                                                    Hand.AttachmentFlags.DetachFromOtherHand |
                                                                    Hand.AttachmentFlags.TurnOffGravity |
                                                                    Hand.AttachmentFlags.VelocityMovement;
    [SerializeField] private bool canStackBelow = true;

    private Interactable interactable;
    private FixedJoint fixedJoint;
    private Rigidbody rb;
    private BurgerItem trackingBelowItem;

    public BurgerItem AboveItem => stackDetector ? stackDetector.AboveItem : null;
    public BurgerItem BelowItem => stackDetector ? stackDetector.BelowItem : null;
    private bool isGlued;

    private void Awake()
    {
        interactable = GetComponent<Interactable>();
        rb = GetComponent<Rigidbody>();

        if (stackDetector != null)
        {
            stackDetector.SetCurrentItem(this);
        }
        else
        {
            Debug.LogWarning($"{gameObject} is missing a StackDetector");
        }
    }

    private void FixedUpdate()
    {
        // if (isGlued)
        // {
        //     rb.MovePosition(trackingBelowItem.stickPoint.position);
        // }
    }

    private void OnCollisionEnter(Collision other)
    {
        if (canStackBelow)
        {
            BurgerItem otherBurgerItem = other.gameObject.GetComponent<BurgerItem>();
        
            if (!isGlued && BelowItem && BelowItem == otherBurgerItem && BelowItem.stickPoint)
            {
                GlueBurger(BelowItem);
            }
        }
    }

    private void HandHoverUpdate(Hand hand)
    {
        GrabTypes startingGrabType = hand.GetGrabStarting();
        bool isGrabEnding = hand.IsGrabEnding(gameObject);

        if (interactable.attachedToHand == null && startingGrabType != GrabTypes.None)
        {
            UnGlueBurger();
            
            hand.HoverLock(interactable);
            hand.AttachObject(gameObject, startingGrabType, attachmentFlags);
        }
        else if (isGrabEnding)
        {
            hand.DetachObject(gameObject);
            hand.HoverUnlock(interactable);
        }
    }

    private void GlueBurger(BurgerItem otherBurgerItem)
    {
        isGlued = true;

        if (otherBurgerItem.stickPoint != null)
        {
            transform.position = otherBurgerItem.stickPoint.position;
        }
        else
        {
            Debug.LogWarning($"{gameObject} is missing a StickPoint");
        }
        
        fixedJoint = gameObject.AddComponent<FixedJoint>();
        fixedJoint.enableCollision = true;
        // fixedJoint.breakForce = 5;
        // fixedJoint.breakTorque = 5;
        fixedJoint.connectedBody = otherBurgerItem.GetComponent<Rigidbody>();

        // rb.isKinematic = true;
        // trackingBelowItem = otherBurgerItem;
        // rb.MovePosition(trackingBelowItem.stickPoint.position);
    }

    private void UnGlueBurger()
    {
        if (isGlued)
        {
            Destroy(fixedJoint);
        }
        
        isGlued = false;
        // rb.isKinematic = false;
        // trackingBelowItem = null;
    }
}
using System;
using UnityEngine;
using Valve.VR.InteractionSystem;


public class AutoAttachCanvas : MonoBehaviour
{
    [SerializeField] private Canvas canvas;

    private float distanceToCenter;
    private float targetY;
    private Transform originalParent;
    private Vector3 targetVector;

    public bool IsCanvasEnabled => canvas.gameObject.activeInHierarchy;

    private void Start()
    {
        Vector3 canvasPos = canvas.transform.position;
        Vector3 pos = transform.position;
        distanceToCenter = Vector3.Distance(
            new Vector3(canvasPos.x, 0, canvasPos.z),
            new Vector3(pos.x, 0, pos.z)
        );
        targetY = canvasPos.y - pos.y;
        DisableCanvas();
    }

    private void Update()
    {
        if (IsCanvasEnabled)
        {
            canvas.transform.position = transform.position + targetVector;
        }
    }

    private void OnHandHoverBegin(Hand hand)
    {
        EnableCanvas();
    }

    private void OnHandHoverEnd(Hand hand)
    {
        DisableCanvas();
    }

    private void EnableCanvas()
    {
        Transform cameraTransform = Camera.main.transform;
        Vector3 cameraRight = cameraTransform.right;
        cameraRight.y = 0;

        targetVector = cameraRight.normalized * distanceToCenter;
        targetVector.y = targetY;
        Vector3 finalCanvasPos = transform.position + targetVector;
        Vector3 lookDirection = cameraTransform.position - finalCanvasPos;
        lookDirection.y = 0;
        canvas.transform.position = finalCanvasPos;
        canvas.transform.rotation = Quaternion.LookRotation(-lookDirection, Vector3.up);
        originalParent = canvas.transform.parent;
        canvas.transform.SetParent(null, true);
        canvas.gameObject.SetActive(true);
    }

    private void DisableCanvas()
    {
        canvas.gameObject.SetActive(false);
        canvas.transform.SetParent(originalParent, true);
    }
}
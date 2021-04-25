using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using TMPro;
using UnityEngine;
using UnityEngine.Events;
using Valve.VR.InteractionSystem;


public class UIReorderableElement : MonoBehaviour
{
    [SerializeField] private float delayToDrag = 0.38f;
    [SerializeField] private TMP_Text text;
    [SerializeField] private Color hoverTextColor = Color.black;
    [SerializeField] private Color swapToTextColor = Color.black;
    [SerializeField] public bool canDrag = true;
    [SerializeField] public UnityEvent OnClick;
    [SerializeField] public UnityEvent OnStartDragging;
    [SerializeField] public UnityEvent OnStopDragging;

    private Interactable interactable;
    private bool isDragging;
    private bool isHoldingGrab;
    private GrabTypes draggingGrabType = GrabTypes.None;
    private Collider[] colliderCache = new Collider[5];
    private Color originalTextColor;
    private UIReorderableElement lastOtherElement;
    private Coroutine dragCoroutine;

    public TMP_Text Text => text;

    private void Awake()
    {
        interactable = GetComponent<Interactable>();
        originalTextColor = text.color;
    }

    private void OnHandHoverBegin(Hand hand)
    {
        text.color = hoverTextColor;
    }
    
    private void OnHandHoverEnd(Hand hand)
    {
        text.color = originalTextColor;
    }

    private void HandHoverUpdate(Hand hand)
    {
        GrabTypes startingGrabType = hand.GetGrabStarting();
        GrabTypes endingGrabType = hand.GetGrabEnding();

        if (!isHoldingGrab && interactable.attachedToHand == null && startingGrabType != GrabTypes.None)
        {
            draggingGrabType = startingGrabType;
            
            if (canDrag)
                dragCoroutine = StartCoroutine(DoDraggingAfterDelay(hand));
            isHoldingGrab = true;
        }
        else if (isHoldingGrab && endingGrabType == draggingGrabType)
        {
            if (isDragging)
            {
                StopDragging(hand);
            }
            else
            {
                if (dragCoroutine != null)
                    StopCoroutine(dragCoroutine);
                OnClick?.Invoke();
                //Debug.Log("On click!");
            }
            
            draggingGrabType = GrabTypes.None;
            isHoldingGrab = false;
        }

        if (isDragging)
        {
            UpdateDragging(hand);
        }
        //Debug.Log($"hand hover update for {name} is grab ending {isGrabEnding}, grab type {startingGrabType}");
    }

    private IEnumerator DoDraggingAfterDelay(Hand hand)
    {
        yield return new WaitForSeconds(delayToDrag);
        StartDragging(hand);
    }

    private void StartDragging(Hand hand)
    {
        hand.HoverLock(interactable);
        isDragging = true;
        Debug.Log($"Start Dragging {name}");
        OnStartDragging?.Invoke();
    }

    private void StopDragging(Hand hand)
    {
        UIReorderableElement other = FindReorderableElementAtHand(hand);

        // If we found another, proceeding to swapping their order
        if (other != null)
        {
            //Debug.Log($"Swapping {name} and {other.name}");
            int index = transform.GetSiblingIndex();
            int otherIndex = other.transform.GetSiblingIndex();
                
            transform.SetSiblingIndex(otherIndex);
            other.transform.SetSiblingIndex(index);
        }
        
        if (lastOtherElement != null)
        {
            lastOtherElement.text.color = lastOtherElement.originalTextColor;
            lastOtherElement = null;
        }
        
        hand.ForceHoverUnlock();
        isDragging = false;
        //Debug.Log($"Stopped Dragging {name}");
        OnStopDragging?.Invoke();
    }

    private void UpdateDragging(Hand hand)
    {
        UIReorderableElement other = FindReorderableElementAtHand(hand);

        if (other != null)
        {
            if (lastOtherElement != null)
            {
                lastOtherElement.text.color = lastOtherElement.originalTextColor;
            }
        
            other.text.color = other.swapToTextColor;
            lastOtherElement = other;
        }
    }

    private UIReorderableElement FindReorderableElementAtHand(Hand hand)
    {
        Vector3 hoverPos = hand.hoverSphereTransform.position;
        var foundElements = new List<UIReorderableElement>();
        int collideCount = Physics.OverlapSphereNonAlloc(hoverPos, hand.hoverSphereRadius, colliderCache);

        for (int i = 0; i < collideCount; i++)
        {
            Collider col = colliderCache[i];
            UIReorderableElement reorderableElement = col.GetComponentInParent<UIReorderableElement>();

            if (reorderableElement != null && reorderableElement != this)
            {
                foundElements.Add(reorderableElement);
            }
        }

        if (foundElements.Any())
        {
            return foundElements.Aggregate((first, second) =>
                Vector3.Distance(hoverPos, first.transform.position) <
                Vector3.Distance(hoverPos, second.transform.position) ? first : second);
        }

        return null;
    }
}
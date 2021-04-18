using System;
using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using Valve.VR.InteractionSystem;

[RequireComponent(typeof(Interactable))]
public class BurgerItem : MonoBehaviour
{
    private struct RigidbodyConfig
    {
        public float mass;
        public float drag;
        public float angularDrag;
        public bool isKinematic;
        public RigidbodyInterpolation interpolation;
        public RigidbodyConstraints constraints;
        public bool useGravity;
        public CollisionDetectionMode collisionDetectionMode;

        public RigidbodyConfig(Rigidbody rigidbody)
        {
            mass = rigidbody.mass;
            drag = rigidbody.drag;
            angularDrag = rigidbody.angularDrag;
            isKinematic = rigidbody.isKinematic;
            interpolation = rigidbody.interpolation;
            useGravity = rigidbody.useGravity;
            constraints = rigidbody.constraints;
            collisionDetectionMode = rigidbody.collisionDetectionMode;
        }

        public void ApplyTo(Rigidbody rigidbody)
        {
            rigidbody.mass = mass;
            rigidbody.drag = drag;
            rigidbody.angularDrag = angularDrag;
            rigidbody.isKinematic = isKinematic;
            rigidbody.interpolation = interpolation;
            rigidbody.useGravity = useGravity;
            rigidbody.constraints = constraints;
            rigidbody.collisionDetectionMode = collisionDetectionMode;
        }
    }
    
    [SerializeField] private BurgerStackDetector stackDetector;
    [SerializeField] private Transform aboveStickPoint;
    [SerializeField] private Transform belowStickPoint;
    [SerializeField] private Hand.AttachmentFlags attachmentFlags = Hand.AttachmentFlags.DetachOthers |
                                                                    Hand.AttachmentFlags.DetachFromOtherHand |
                                                                    Hand.AttachmentFlags.TurnOffGravity |
                                                                    Hand.AttachmentFlags.VelocityMovement;
    [SerializeField] private bool canStackBelow = true;

    private Interactable interactable;
    private Rigidbody rb;
    private RigidbodyConfig rigidbodyConfig;
    private Transform unGluedParent;
    private bool isGlued;
    private BurgerItem gluedItem;

    public BurgerItem AboveItem => stackDetector ? stackDetector.AboveItem : null;
    public BurgerItem BelowItem => stackDetector ? stackDetector.BelowItem : null;
    public bool IsGlued => isGlued;
    public BurgerItem GluedItem => gluedItem;
    

    private void Awake()
    {
        interactable = GetComponent<Interactable>();
        rb = GetComponent<Rigidbody>();
        unGluedParent = transform.parent;

        if (rb)
        {
            rigidbodyConfig = new RigidbodyConfig(rb);
        }

        if (stackDetector != null)
        {
            stackDetector.SetCurrentItem(this);
        }
        else
        {
            Debug.LogWarning($"{gameObject} is missing a StackDetector");
        }
    }

    private void OnCollisionEnter(Collision other)
    {
        if (canStackBelow && !isGlued)
        {
            BurgerItem otherBurgerItem = other.gameObject.GetComponent<BurgerItem>();
        
            if (BelowItem && BelowItem == otherBurgerItem && BelowItem.aboveStickPoint)
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
        gluedItem = otherBurgerItem;
        
        Destroy(rb);
        transform.SetParent(otherBurgerItem.transform, true);

        if (belowStickPoint != null)
        {
            Vector3 vectorFromBelow = transform.position - belowStickPoint.position;
            transform.position = otherBurgerItem.aboveStickPoint.position + vectorFromBelow;
        }
        else
        {
            Debug.LogWarning($"{gameObject.name} is missing a BelowStickPoint");
        }
    }

    private void UnGlueBurger()
    {
        rb = gameObject.AddComponent<Rigidbody>();
        rigidbodyConfig.ApplyTo(rb);
        transform.SetParent(unGluedParent, true);

        gluedItem = null;
        isGlued = false;
    }
}
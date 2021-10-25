using System;
using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.Events;
using Valve.VR.InteractionSystem;

[RequireComponent(typeof(Interactable))]
public class BurgerItem : MonoBehaviour
{
    public class StickPoint
    {
        public readonly BurgerItem originItem;
        private readonly Transform point;
        private readonly bool isAbove;

        public Vector3 Position => point.position;
        public Quaternion Rotation => point.rotation;
        public bool IsAbove => isAbove;
        public bool IsBelow => !isAbove;
        public bool IsGlued { get; set; }
        public bool CanGlue => point != null && !IsGlued;

        public StickPoint(BurgerItem originItem, Transform point, bool isAbove)
        {
            this.originItem = originItem;
            this.point = point;
            this.isAbove = isAbove;
        }
        
        public bool CanGlueTo(StickPoint other) =>
            CanGlue && other.CanGlue && 
            originItem.gluedItem != other.originItem && originItem.gluedFrom != other.originItem;
    }
    
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
    [SerializeField] private bool isBoard;
    [SerializeField] public UnityEvent OnAboveStackChanged;
    
    private const float SnapDistance = 0.1f;
    private const float falloffAngle = 70;
    private Interactable interactable;
    private Rigidbody rb;
    private RigidbodyConfig rigidbodyConfig;
    private Transform unGluedParent;
    private bool isGlued;
    private Hand handToAttachNextFrame;
    private GrabTypes grabTypeNextFrame;
    private BurgerItem gluedItem;
    private BurgerItem gluedFrom;
    private StickPoint gluedStickPoint;
    private StickPoint gluedFromStickPoint;
    private bool isHandHolding;

    // public BurgerItem AboveItem => stackDetector ? (isUpsideDown ? stackDetector.BelowItem : stackDetector.AboveItem) : null;
    // public BurgerItem BelowItem => stackDetector ? (isUpsideDown ? stackDetector.AboveItem : stackDetector.BelowItem) : null;
    public BurgerItem AboveItem => stackDetector.AboveItem;
    public BurgerItem BelowItem => stackDetector.BelowItem;
    public bool IsGlued => isGlued;
    public BurgerItem GluedBelowItem => gluedItem;
    public BurgerItem GluedAboveItem => gluedFrom;
    public StickPoint AboveStickPoint { get; private set; }
    public StickPoint BelowStickPoint { get; private set; }
    

    private void Awake()
    {
        interactable = GetComponent<Interactable>();
        rb = GetComponent<Rigidbody>();
        unGluedParent = transform.parent;
        AboveStickPoint = new StickPoint(this, aboveStickPoint, true);
        BelowStickPoint = new StickPoint(this, belowStickPoint, false);

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

    private void FixedUpdate()
    {
        if (handToAttachNextFrame != null)
        {
            handToAttachNextFrame.HoverLock(interactable);
            handToAttachNextFrame.AttachObject(gameObject, grabTypeNextFrame, attachmentFlags);
            handToAttachNextFrame = null;
        }

        float tiltAngle = Vector3.Angle(Vector3.up, transform.up);

        if (tiltAngle >= falloffAngle)
        {
            UnGlueBurger();
        }
    }

    private void OnCollisionEnter(Collision other)
    {
        TryGlue(other.gameObject);
    }

    private void OnCollisionStay(Collision other)
    {
        TryGlue(other.gameObject);
    }

    private void OnHandHoverBegin(Hand hand)
    {
        //Debug.Log($"Hovering with ${hand.handType} over {hand.hoveringInteractable.name}");
    }

    private void HandHoverUpdate(Hand hand)
    {
        GrabTypes startingGrabType = hand.GetGrabStarting();
        bool isGrabEnding = hand.IsGrabEnding(gameObject);

        if (handToAttachNextFrame == null && interactable.attachedToHand == null && startingGrabType != GrabTypes.None)
        {
            AttachToHand(hand, startingGrabType);
        }
        else if (isGrabEnding)
        {
            DetachFromHand(hand);
        }
    }
    
    public void AttachToHand(Hand hand, GrabTypes startingGrabType)
    {
        isHandHolding = true;
        Debug.Log($"Hand attaching {name}");
        UnGlueBurger();
            
        handToAttachNextFrame = hand;
        grabTypeNextFrame = startingGrabType;
    }

    public void DetachFromHand(Hand hand)
    {
        Debug.Log($"Hand detaching {name}");
            
        hand.DetachObject(gameObject);
        hand.HoverUnlock(interactable);
        isHandHolding = false;
    }

    private BurgerItem GetTopMostItem()
    {
        BurgerItem currentItem = this;
        int iterations = 0;
        const int limit = 1000;

        while (currentItem.gluedFrom != null && iterations++ < limit)
        {
            currentItem = currentItem.gluedFrom;
        }

        return currentItem;
    }
    
    private BurgerItem GetBottomMostItem()
    {
        BurgerItem currentItem = this;
        int iterations = 0;
        const int limit = 1000;

        while (currentItem.gluedItem != null && iterations++ < limit)
        {
            currentItem = currentItem.gluedItem;
        }

        return currentItem;
    }

    private void TryGlue(GameObject otherObject)
    {
        if (!isHandHolding && !isGlued)
        {
            BurgerItem otherBurgerItem = otherObject.GetComponent<BurgerItem>();

            if (otherBurgerItem)
            {
                // Only glue from the top to bottom
                bool isItemBelow = otherBurgerItem.transform.position.y < transform.position.y;
                bool isAlreadyGlued = gluedFrom == otherBurgerItem || gluedItem == otherBurgerItem;
                
                if (isItemBelow && (canStackBelow || otherBurgerItem.isBoard) && !isAlreadyGlued)
                {
                    BurgerItem topMostItem = otherBurgerItem.GetTopMostItem();
                    var pointPair = GetClosestStickPointsTo(otherBurgerItem, true, SnapDistance);

                    if (pointPair.HasValue && otherBurgerItem == topMostItem)
                    {
                        Debug.Log($"{name} Glue with {otherBurgerItem}");
                        GlueBurger(pointPair.Value.currentStickPoint, pointPair.Value.otherStickPoint);
                    }
                }
            }
        }
    }

    private void GlueBurger(StickPoint current, StickPoint other)
    {
        BurgerItem otherBurgerItem = other.originItem;
        
        if (current.originItem == other.originItem)
            throw new ArgumentException("Cannot glue a burger to itself!");

        if (gluedFrom == otherBurgerItem)
            throw new ArgumentException("Cannot glue to a burger twice!");
        
        isGlued = true;
        current.IsGlued = true;
        other.IsGlued = true;
        gluedItem = otherBurgerItem;
        gluedStickPoint = current;
        gluedFromStickPoint = other;
        otherBurgerItem.gluedFrom = this;
        InvokeStackChangedBelow(gluedItem);
        
        Destroy(rb);
        transform.SetParent(otherBurgerItem.transform, true);

        Vector3 vectorFromCurrentCenter = transform.position - current.Position;
        transform.position = other.Position + vectorFromCurrentCenter;
        
        // If they are matching, above and above or below and below
        Quaternion rotation = current.IsAbove == other.IsAbove 
            ? Quaternion.Inverse(other.Rotation)
            : other.Rotation;

        transform.rotation = rotation;

        // if (belowStickPoint != null)
        // {
        //     Vector3 vectorFromBelow = transform.position - belowStickPoint.position;
        //     transform.position = otherBurgerItem.aboveStickPoint.position + vectorFromBelow;
        //
        //     transform.rotation = otherBurgerItem.aboveStickPoint.transform.rotation;
        //     // transform.rotation = otherBurgerItem.GetBottomItem().transform.rotation;
        // }
        // else
        // {
        //     Debug.LogWarning($"{gameObject.name} is missing a BelowStickPoint");
        // }
    }

    private void UnGlueBurger()
    {
        if (isGlued)
        {
            rb = gameObject.AddComponent<Rigidbody>();
            // TODO fix below
            // rigidbodyConfig.ApplyTo(rb);
            transform.SetParent(unGluedParent, true);

            BurgerItem belowItem = gluedItem;
            gluedItem.gluedFrom = null;
            gluedItem = null;
            gluedStickPoint.IsGlued = false;
            gluedFromStickPoint.IsGlued = false;
            gluedStickPoint = null;
            gluedFromStickPoint = null;
            InvokeStackChangedBelow(belowItem);
            isGlued = false;
        }
    }

    /// <summary>
    /// Get two of the closest stick points that can glue to each other.
    /// </summary>
    private (StickPoint currentStickPoint, StickPoint otherStickPoint)? GetClosestStickPointsTo(BurgerItem other, bool ungluedPoints = false, float maxDistance = float.MaxValue)
    {
        (StickPoint, StickPoint)? bestCombination = null;
        float bestDistance = float.MaxValue;
        (StickPoint, StickPoint)[] possibleCombinations = new (StickPoint, StickPoint)[]
        {
            (AboveStickPoint, other.BelowStickPoint),
            (BelowStickPoint, other.AboveStickPoint),
            (BelowStickPoint, other.BelowStickPoint),
            (AboveStickPoint, other.AboveStickPoint)
        };

        foreach ((StickPoint, StickPoint) combination in possibleCombinations)
        {
            // Make sure the stick points exist and are assigned
            if (combination.Item1.CanGlueTo(combination.Item2))
            {
                float distance = Vector3.Distance(combination.Item1.Position, combination.Item2.Position);

                if (distance <= maxDistance && distance < bestDistance)
                {
                    bestCombination = combination;
                    bestDistance = distance;
                }
            }
        }

        return bestCombination;
    }

    private void InvokeStackChangedBelow(BurgerItem fromItem)
    {
        BurgerItem currentItem = fromItem;
        int iterations = 0;
        const int limit = 10000;

        while (currentItem != null && iterations++ < limit)
        {
            currentItem.OnAboveStackChanged?.Invoke();
            currentItem = currentItem.gluedItem;
        }
    }
}
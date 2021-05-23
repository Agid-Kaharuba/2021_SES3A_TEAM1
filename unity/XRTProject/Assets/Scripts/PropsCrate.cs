using System;
using System.Collections.Generic;
using UnityEngine;
using Valve.VR.InteractionSystem;


public class PropsCrate : MonoBehaviour
{
    [SerializeField] private PropData prop;
    [SerializeField] private List<Transform> propDisplayPoints;

    private bool canSpawn;

    private void Start()
    {
        foreach (Transform propDisplayPoint in propDisplayPoints)
        {
            SetToDisplayProp(SpawnProp(propDisplayPoint.transform.position));
        }
    }

    private void HandHoverUpdate(Hand hand)
    {
        GrabTypes startingGrabType = hand.GetGrabStarting();

        if (hand.currentAttachedObject == null && startingGrabType != GrabTypes.None)
        {
            canSpawn = false;

            GameObject propObject = SpawnProp(hand.hoverSphereTransform.position);

            BurgerItem burgerItem = propObject.GetComponent<BurgerItem>();
            burgerItem.AttachToHand(hand, startingGrabType);
        }
    }

    private GameObject SpawnProp(Vector3 position)
    {
        if (prop == null) return null;

        GameObject propObject = prop.InstantiateProp(position, Quaternion.identity);
        return propObject;
    }

    private void SetToDisplayProp(GameObject propObject)
    {
        if (propObject == null) return;
        
        Interactable interactable = propObject.GetComponent<Interactable>();
        
        if (interactable)
            Destroy(interactable);

        Rigidbody propRb = propObject.GetComponent<Rigidbody>();
        
        if (propRb)
            Destroy(propRb);

        Collider propCol = propObject.GetComponent<Collider>();
        
        if (propCol)
            Destroy(propCol);

        foreach (var col in propObject.GetComponentsInChildren<Collider>())
        {
            Destroy(col);
        }
    }
}
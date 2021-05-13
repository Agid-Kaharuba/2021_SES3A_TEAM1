using System;
using System.Collections.Generic;
using System.Linq;
using UnityEngine;
using Valve.VR.InteractionSystem;

[RequireComponent(typeof(Interactable))]
public class UIHoverShow : MonoBehaviour
{
    [SerializeField] private float hoverToShowTime = 2f;
    [SerializeField] private GameObject targetObject;
    [Tooltip("Optional hand detector, will stay shown until hand is out of detector")] 
    [SerializeField] private List<HandDetector> handDetector = new List<HandDetector>();

    private const float DistanceFromHand = 0.2f;
    private const float ToHandDistanceFactor = 2f;
    private int hoveringCount;
    private float currentHoverTime;
    private readonly List<Hand> hands = new List<Hand>(2);
    
    private Hand LatestHand => hands.LastOrDefault();

    private bool IsHovering => hoveringCount > 0;

    private bool HasHandInDetector => handDetector != null && handDetector.Any(d => d.HasHandInDetector);

    private void OnEnable()
    {
        targetObject.gameObject.SetActive(false);
    }

    private void Update()
    {
        if (enabled)
            HandleHovering();
    }

    private void OnHandHoverBegin(Hand hand)
    {
        hoveringCount++;
        hands.Add(hand);
    }

    private void OnHandHoverEnd(Hand hand)
    {
        hoveringCount--;
        hands.Remove(hand);
    }

    private void PositionCanvasWithRespectToHand()
    {
        Hand hand = LatestHand;
        
        Vector3 toHandVector = (hand.transform.position - transform.position) * ToHandDistanceFactor;
        Vector3 rightOfHand = (hand.transform.position + (transform.right * DistanceFromHand)) - hand.transform.position;
        targetObject.transform.position = transform.position + toHandVector + rightOfHand;
    }

    private void HandleHovering()
    {
        if (IsHovering)
        {
            currentHoverTime += Time.deltaTime;

            if (currentHoverTime >= hoverToShowTime && !targetObject.gameObject.activeInHierarchy)
            {
                targetObject.gameObject.SetActive(true);
                PositionCanvasWithRespectToHand();
            }
        }
        else if (!HasHandInDetector)
        {
            currentHoverTime = 0f;
            targetObject.gameObject.SetActive(false);
        }
    }
}
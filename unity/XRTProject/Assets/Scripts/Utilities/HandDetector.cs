using System;
using UnityEngine;
using UnityEngine.Events;
using Valve.VR.InteractionSystem;


[RequireComponent(typeof(Interactable))]
public class HandDetector : MonoBehaviour
{
    public UnityEvent OnHandDetected;
    public UnityEvent OnNoHandDetected;
    
    private int hoveringCount = 0;
    private bool lastHasHandInDetector;

    public bool HasHandInDetector => hoveringCount > 0;

    private void Update()
    {
        if (HasHandInDetector != lastHasHandInDetector)
        {
            if (HasHandInDetector)
            {
                OnHandDetected?.Invoke();
            }
            else
            {
                OnNoHandDetected?.Invoke();
            }
            
            lastHasHandInDetector = HasHandInDetector;
        }
    }

    private void OnHandHoverBegin(Hand hand)
    {
        hoveringCount++;
    }

    private void OnHandHoverEnd(Hand hand)
    {
        hoveringCount--;
    }
}
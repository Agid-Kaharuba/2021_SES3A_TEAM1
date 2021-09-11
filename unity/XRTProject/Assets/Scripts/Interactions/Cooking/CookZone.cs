using System;
using UnityEngine;


public class CookZone : MonoBehaviour
{
    public float strength = 1f;
    
    private void OnTriggerStay(Collider other)
    {
        Cookable cookable = other.GetComponent<Cookable>();

        if (cookable != null)
        {
            cookable.TickCookTime(strength, Time.fixedDeltaTime);
        }
    }

    private void OnValidate()
    {
        // Strength cannot be 0
        if (strength <= 0)
            strength = 0.01f;
    }
}
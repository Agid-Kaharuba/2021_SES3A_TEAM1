using System;
using UnityEngine;


public class CookZone : MonoBehaviour
{
    [SerializeField] private bool oneSidedCooking;
    public bool isActive;
    [Min(0)] public float strength = 1f;
    
    private void OnTriggerStay(Collider other)
    {
        if (!isActive) return;
        
        Cookable cookable = other.GetComponent<Cookable>();

        if (cookable != null)
        {
            cookable.TickCooking(strength, Time.fixedDeltaTime, oneSidedCooking);
        }
    }

    public void SetCanCook(bool isActive)
    {
        this.isActive = isActive;
    }
    
    public void SetStrength(float strength)
    {
        this.strength = strength;
    }

    private void OnValidate()
    {
        // Strength cannot be 0
        if (strength <= 0)
            strength = 0.01f;
    }
}
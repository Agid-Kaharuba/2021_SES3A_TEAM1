using System;
using UnityEngine;


public class CookZone : MonoBehaviour
{
    [SerializeField] private bool oneSidedCooking;
    public bool isActive;

    bool cookingsound = false;

    [Min(0)] public float strength = 1f;
    
    private void OnTriggerStay(Collider other)
    {
        if (!isActive) return;
        
        Cookable cookable = other.GetComponent<Cookable>();

        if (cookable != null)
        {
            cookable.TickCooking(strength, Time.fixedDeltaTime, oneSidedCooking);
            PlaySoudnd();
        }
        //if (other == null) { StopSoudnd(); }

    }
    private void OnTriggerExit(Collider other)
    {
        
            StopSoudnd();
        

    }

    void PlaySoudnd()
    {
        if (cookingsound == false)
        {
            cookingsound = true;
            FindObjectOfType<AudioManager>().Play("Grilling");
        }
    }
    public void StopSoudnd()
    {
        if (cookingsound == true)
        {
            cookingsound = false;
            FindObjectOfType<AudioManager>().Stop("Grilling");
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
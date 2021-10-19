using System;
using System.Collections.Generic;
using System.Linq;
using Interactions.Cooking;
using UnityEngine;


public class Cookable : MonoBehaviour
{
    [SerializeField] private bool canCookBothSides = true;
    [SerializeField] private float perfectCookDuration = 10f;
    [SerializeField] private float maxCookDuration = 20f;
    [Tooltip("How much of the heat will transfer to the other sides of the item when one side is being cooked")]
    [SerializeField] private float heatConductivity = 0.01f;

    private List<CookTextureTransition> cookTextureTransitions;

    public float AverageCookTime => AllSides.Sum(s => s.CookTime) / 2f;
    public float CookPercentage => AverageCookTime / perfectCookDuration;
    public float MaxCookPercentage => AverageCookTime / maxCookDuration;
    public float CookTime => AverageCookTime;
    public CookableSide TopSide { get; private set; } = new CookableSide(CookSide.Top, () => 0, () => 0);
    public CookableSide BottomSide { get; private set; } = new CookableSide(CookSide.Bottom, () => 0, () => 0);
    private CookableSide[] AllSides => new[] {TopSide, BottomSide};

    private void Awake()
    {
        var cookTextureTransition = GetComponent<CookTextureTransition>();
        
        cookTextureTransitions = GetComponentsInChildren<CookTextureTransition>()
            .ToList();

        if (cookTextureTransition != null)
            cookTextureTransitions.Add(cookTextureTransition);

        TopSide = new CookableSide(CookSide.Top, () => perfectCookDuration, () => maxCookDuration);
        BottomSide = new CookableSide(CookSide.Bottom, () => perfectCookDuration, () => maxCookDuration);
    }

    public void TickCooking(float strength, float deltaTime, bool singleSided)
    {
        if (singleSided && canCookBothSides)
        {
            TickCookingCurrentSide(strength, deltaTime);
            
        }
        else
        {
            TickCookingAllSides(strength, deltaTime);
        }
    }
    
    private void TickCookingCurrentSide(float strength, float deltaTime)
    {
        // Current cooking side
        CookableSide currentSide = GetCurrentSide();
        currentSide.CookTime = Mathf.Clamp(currentSide.CookTime + deltaTime * strength, 0, maxCookDuration);
        cookTextureTransitions.ForEach(t => t.SetCookPercentage(currentSide.CookPercentage, currentSide.CookSide));

        // Also cook the other sides by the percentage defined by heat conductivity
        foreach (CookableSide side in AllSides)
        {
            if (side != currentSide)
            {
                float addedCookTime = deltaTime * strength * heatConductivity;
                side.CookTime = Mathf.Clamp(side.CookTime + addedCookTime, 0, maxCookDuration);
                cookTextureTransitions.ForEach(t => t.SetCookPercentage(side.CookPercentage, side.CookSide));
            }
        }
    }
    
    private void TickCookingAllSides(float strength, float deltaTime)
    {
        // Also cook the other sides by the percentage defined by heat conductivity
        foreach (CookableSide side in AllSides)
        {
            float addedCookTime = deltaTime * strength;
            side.CookTime = Mathf.Clamp(side.CookTime + addedCookTime, 0, maxCookDuration);
            cookTextureTransitions.ForEach(t => t.SetCookPercentage(side.CookPercentage, side.CookSide));
        }
    }

    private CookableSide GetCurrentSide()
    {
        Vector3 objectUpVector = transform.up;

        float upAngle = Vector3.Angle(Vector3.up, objectUpVector);
        float downAngle = Vector3.Angle(Vector3.down, objectUpVector);

        // If it is upright, then we are cooking the bottom side
        return upAngle <= downAngle ? BottomSide : TopSide;
    }
}
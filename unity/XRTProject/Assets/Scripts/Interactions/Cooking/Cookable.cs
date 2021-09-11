using System;
using System.Collections.Generic;
using System.Linq;
using UnityEngine;


public class Cookable : MonoBehaviour
{
    [SerializeField] private float perfectCookDuration = 10f;
    [SerializeField] private float maxCookDuration = 20f;

    private float cookTime = 0;
    private List<CookTextureTransition> cookTextureTransitions;

    public bool IsCooked => cookTime >= perfectCookDuration;
    public float CookPercentage => cookTime / perfectCookDuration;
    public float MaxCookPercentage => cookTime / maxCookDuration;
    public float CookTime => cookTime;

    private void Awake()
    {
        var cookTextureTransition = GetComponent<CookTextureTransition>();
        
        cookTextureTransitions = GetComponentsInChildren<CookTextureTransition>()
            .ToList();

        if (cookTextureTransition != null) 
            cookTextureTransitions.Add(cookTextureTransition);
    }

    public void TickCookTime(float strength, float deltaTime)
    {
        cookTime = Mathf.Clamp(cookTime + deltaTime * strength, 0, maxCookDuration);
        cookTextureTransitions.ForEach(t => t.SetCookPercentage(CookPercentage));
    }
}
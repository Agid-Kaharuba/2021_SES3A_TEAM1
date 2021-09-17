using System;
using Interactions.Cooking;
using UnityEngine;

public class CookTextureTransition : MonoBehaviour
{
    private Material material;
    // Do below, to optimise it
    private static readonly int CookTime = Shader.PropertyToID("_CookTime");
    private static readonly int TopCookTime = Shader.PropertyToID("_TopCookTime");
    private static readonly int BottomCookTime = Shader.PropertyToID("_BottomCookTime");

    private void Awake()
    {
        MeshRenderer meshRenderer = GetComponent<MeshRenderer>();
        material = meshRenderer.material;
    }

    public void SetCookPercentage(float completionPercentage)
    {
        material.SetFloat(CookTime, completionPercentage);
    }
    
    public void SetCookPercentage(float completionPercentage, CookSide side)
    {
        int nameId = side == CookSide.Top ? TopCookTime : BottomCookTime;
        material.SetFloat(nameId, completionPercentage);
    }
}
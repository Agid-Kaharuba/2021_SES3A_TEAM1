using System;
using UnityEngine;

public class CookTextureTransition : MonoBehaviour
{
    private Material material;
    // Do below, to optimise it
    private static readonly int CookTime = Shader.PropertyToID("_CookTime");

    private void Awake()
    {
        MeshRenderer meshRenderer = GetComponent<MeshRenderer>();
        material = meshRenderer.material;
    }

    public void SetCookPercentage(float completionPercentage)
    {
        material.SetFloat(CookTime, completionPercentage);
    }
}
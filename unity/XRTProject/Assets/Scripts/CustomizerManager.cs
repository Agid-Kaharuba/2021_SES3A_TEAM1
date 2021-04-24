using System;
using UnityEngine;


public class CustomizerManager : MonoBehaviour
{
    [SerializeField] private bool customizeMode;
    
    public static CustomizerManager Instance { get; private set; }

    public bool CustomizeMode => customizeMode;

    private void Awake()
    {
        if (Instance != null)
        {
            Destroy(this);
            return;
        }
        
        Instance = this;
    }
}
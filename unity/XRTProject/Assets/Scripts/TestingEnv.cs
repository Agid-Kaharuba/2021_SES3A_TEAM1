using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using TMPro;
using UnityEngine;

public class TestingEnv : MonoBehaviour
{
    [SerializeField] private TMP_Text testingText;
    
    private void Start()
    {
        string testText = string.Join(" | " , Environment.GetCommandLineArgs());
        testingText.text = testText;
    }
}

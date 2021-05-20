using System;
using TMPro;
using UnityEngine;
using UnityEngine.Events;
using VRKeys;

public class KeyboardHandler : MonoBehaviour
{
    public class OnTextEditingFinishedEvent : UnityEvent<string> {}

    [SerializeField] private Keyboard keyboard;
    [SerializeField] public OnTextEditingFinishedEvent OnTextEditingFinished;

    private bool isTextEditing;

    private void Awake()
    {
        keyboard.OnSubmit.AddListener(OnSubmit);
        keyboard.OnCancel.AddListener(OnCancel);
    }

    public void EnableTextEditing(TMP_Text text)
    {
        if (keyboard == null) return;
        keyboard.targetText = text;
        keyboard.Enable();
        isTextEditing = true;
    }

    private void OnSubmit(string text)
    {
        if (isTextEditing)
        {
            OnTextEditingFinished?.Invoke(text);
        }
        
        keyboard.Disable();
        keyboard.targetText = null;
        isTextEditing = false;
    }

    private void OnCancel()
    {
        keyboard.Disable();
    }
}
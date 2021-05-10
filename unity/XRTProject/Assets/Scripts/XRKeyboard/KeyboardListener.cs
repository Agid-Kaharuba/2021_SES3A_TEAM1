using System;
using UnityEngine;
using UnityEngine.Events;


public class KeyboardListener : MonoBehaviour
{
    public UnityEvent OnKeyboardEnabled;
    public UnityEvent OnKeyboardDisabled;

    private void OnEnable()
    {
        XRKeyboardManager.Instance.OnKeyboardEnabled.AddListener(OnKeyboardActive);
        XRKeyboardManager.Instance.OnKeyboardDisabled.AddListener(OnKeyboardInactive);
    }

    private void OnDisable()
    {
        XRKeyboardManager.Instance.OnKeyboardEnabled.RemoveListener(OnKeyboardActive);
        XRKeyboardManager.Instance.OnKeyboardDisabled.RemoveListener(OnKeyboardInactive);
    }

    private void OnKeyboardActive()
    {
        OnKeyboardEnabled?.Invoke();
    }

    private void OnKeyboardInactive()
    {
        OnKeyboardDisabled?.Invoke();
    }
}

using System;
using TMPro;
using UnityEngine;
using UnityEngine.Events;
using VRKeys;

public class KeyboardResponder : MonoBehaviour
{
    [Serializable]
    public class OnTextSubmitEvent : UnityEvent<string> {}
    
    [SerializeField] public OnTextSubmitEvent OnTextSubmit;
    
    public void EnableTextEditing(TMP_Text text)
    {
        XRKeyboardManager keyboardManager = XRKeyboardManager.Instance;
        keyboardManager.TargetText(text);
        keyboardManager.EnableKeyboard();
        keyboardManager.OnKeyboardSubmit.AddListener(OnSubmit);
    }

    private void OnSubmit(string text)
    {
        OnTextSubmit?.Invoke(text);
        XRKeyboardManager.Instance.OnKeyboardSubmit.RemoveListener(OnSubmit);
        XRKeyboardManager.Instance.DisableKeyboard();
    }
}
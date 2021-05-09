using TMPro;
using UnityEngine;
using UnityEngine.Events;
using VRKeys;

public class KeyboardResponder : MonoBehaviour
{
    public class OnTextEditingFinishedEvent : UnityEvent<string> {}
    
    [SerializeField] public OnTextEditingFinishedEvent OnTextEditingFinished;
    
    public void EnableTextEditing(TMP_Text text)
    {
        XRKeyboardManager keyboardManager = XRKeyboardManager.Instance;
        keyboardManager.TargetText(text);
        keyboardManager.EnableKeyboard();
        keyboardManager.OnKeyboardSubmit.AddListener(OnSubmit);
    }

    private void OnSubmit(string text)
    {
        OnTextEditingFinished?.Invoke(text);
        XRKeyboardManager.Instance.OnKeyboardSubmit.RemoveListener(OnSubmit);
        XRKeyboardManager.Instance.DisableKeyboard();
    }
}
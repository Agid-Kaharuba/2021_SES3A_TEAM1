using System;
using TMPro;
using UnityEngine;
using UnityEngine.Events;
using UnityEngine.UI;
using Valve.VR.InteractionSystem;

public class UIRemoveButton : MonoBehaviour
{
    [SerializeField] private GameObject targetDestroyObject;
    [SerializeField] private Color warningButtonColor = Color.red;
    [SerializeField] private Color warningTextColor = Color.white;
    public UnityEvent OnRemove;
    
    private UIElement uiElement;
    private TMP_Text text;
    private Image buttonImage;
    private Color originalTextColor;
    private Color originalButtonColor;
    private bool isConfirming;

    private void Start()
    {
        uiElement = GetComponent<UIElement>();
        buttonImage = GetComponentInChildren<Image>();
        text = GetComponentInChildren<TMP_Text>();
        uiElement.onHandClick.AddListener(OnHandClick);

        originalTextColor = text.color;
        originalButtonColor = buttonImage.color;
    }

    private void OnHandHoverEnd(Hand hand)
    {
        SetIsConfirming(false);
    }

    private void OnHandClick(Hand hand)
    {
        if (!isConfirming)
        {
            SetIsConfirming(true);
        }
        else
        {
            OnRemove?.Invoke();
            Destroy(targetDestroyObject.gameObject);
        }
    }

    private void SetIsConfirming(bool isConfirmingRemove)
    {
        if (isConfirmingRemove)
        {
            text.color = warningTextColor;
            buttonImage.color = warningButtonColor;
        }
        else
        {
            text.color = originalTextColor;
            buttonImage.color = originalButtonColor;
        }

        isConfirming = isConfirmingRemove;
    }
}
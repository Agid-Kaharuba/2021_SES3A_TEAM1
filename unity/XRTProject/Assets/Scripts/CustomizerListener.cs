using System;
using UnityEngine;
using UnityEngine.Events;


public class CustomizerListener : MonoBehaviour
{
    public UnityEvent OnCanCustomize;
    public UnityEvent OnCannotCustomize;

    private void OnEnable()
    {
        TrainingManager.Instance.OnCustomizationSettingsChanged.AddListener(OnCustomizationSettingsChanged);
    }

    private void OnDisable()
    {
        TrainingManager.Instance.OnCustomizationSettingsChanged.RemoveListener(OnCustomizationSettingsChanged);
    }

    private void OnCustomizationSettingsChanged()
    {
        if (TrainingManager.Instance.CanCustomize)
        {
            OnCanCustomize?.Invoke();
        }
        else
        {
            OnCannotCustomize?.Invoke();
        }
    }
}

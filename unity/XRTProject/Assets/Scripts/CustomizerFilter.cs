using System;
using UnityEngine;
using UnityEngine.Events;


public class CustomizerFilter : MonoBehaviour
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
        User user = TrainingManager.Instance.CurrentUser;

        if (TrainingManager.Instance.forceCanCustomize)
        {
            OnCanCustomize?.Invoke();
        }
        else if (user != null)
        {
            if (user.IsSupervisor)
            {
                OnCanCustomize?.Invoke();
            }
            else
            {
                OnCannotCustomize?.Invoke();
            }
        }
    }
}

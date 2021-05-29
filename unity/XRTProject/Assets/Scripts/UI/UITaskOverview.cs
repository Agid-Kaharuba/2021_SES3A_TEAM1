using System;
using TMPro;
using UnityEngine;


public class UITaskOverview : MonoBehaviour
{
    [SerializeField] private GameObject content;
    [SerializeField] private TMP_Text titleText;

    private void OnEnable()
    {
        TrainingManager.Instance.OnCurrentTaskChanged.AddListener(UpdateTask);
        UpdateTask();
    }

    private void OnDisable()
    {
        TrainingManager.Instance.OnCurrentTaskChanged.RemoveListener(UpdateTask);
    }

    private void UpdateTask()
    {
        if (TrainingManager.Instance.HasCurrentTask)
        {
            content.SetActive(true);
            Task currentTask = TrainingManager.Instance.CurrentTask;
        
            if (titleText)
                titleText.text = currentTask.Name;
        }
        else
        {
            content.SetActive(false);
        }
    }
}
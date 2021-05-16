using System;
using TMPro;
using UnityEngine;


public class UITrainingOverview : MonoBehaviour
{
    [SerializeField] private TMP_Text titleText;
    [SerializeField] private TMP_Text descriptionText;

    private void Awake()
    {
        TrainingManager.Instance.OnTrainingModuleChanged.AddListener(UpdateTraining);
    }

    private void OnDestroy()
    {
        TrainingManager.Instance.OnTrainingModuleChanged.RemoveListener(UpdateTraining);;
    }

    private void UpdateTraining()
    {
        TrainingModule trainingModule = TrainingManager.Instance.TrainingModule;
        titleText.text = $"{trainingModule.Name}";
        descriptionText.text = trainingModule.Description;
    }
}
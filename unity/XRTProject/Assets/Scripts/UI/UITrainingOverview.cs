using System;
using TMPro;
using UnityEngine;


public class UITrainingOverview : MonoBehaviour
{
    [SerializeField] private TMP_Text titleText;
    [SerializeField] private TMP_Text descriptionText;

    private void Start()
    {
        TrainingModule trainingModule = TrainingManager.Instance.TrainingModule;
        titleText.text = $"{trainingModule.Name} Training";
        descriptionText.text = trainingModule.Description;
    }
}
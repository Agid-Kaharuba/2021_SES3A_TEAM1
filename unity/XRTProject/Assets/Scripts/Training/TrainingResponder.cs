using TMPro;
using UnityEngine;


public class TrainingResponder : MonoBehaviour
{
    public void UpdateTrainingName(TMP_Text text)
    {
        TrainingManager.Instance.UpdateTrainingName(text.text);
    }
    
    public void UpdateTrainingDescription(TMP_Text text)
    {
        TrainingManager.Instance.UpdateTrainingDescription(text.text);
    }
}
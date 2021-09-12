using System;
using UnityEngine;

public class Logger: MonoBehaviour
{
    private ApiService ApiService;
    private User User;
    // private TrainingModule TrainingModule;

    public void Setup(ApiService apiService, TrainingModule trainingModule, User user)
    {
        ApiService = apiService;
        // TrainingModule = trainingModule;
        User = user;
    }

    public void Log(string _event, string value)
    {
        Tracking tracking = new Tracking(DateTime.Now, _event, value);
        Debug.Log(tracking);
        Send(tracking);
    }

    public void Send(Tracking tracking)
    {
        Task CurrentTask = TrainingManager.Instance.CurrentTask;
        TrainingModule TrainingModule = TrainingManager.Instance.TrainingModule;
        StartCoroutine(ApiService.SubmitTaskTracking(tracking, User.Id, CurrentTask.Id, TrainingModule.Id, (obj) =>
        {
            if (obj is BackendErrorResponse error)
            {
                Debug.LogError($"Error submitting tracking {error.Status}: {error.Message}");
            }
        }));
    }
}
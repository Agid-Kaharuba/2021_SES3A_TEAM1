using System;
using UnityEngine;

public class Track: MonoBehaviour
{
    private ApiService ApiService;
    public static Track Instance { get; private set; }

    public void Setup(ApiService apiService)
    {
        ApiService = apiService;
        Instance = this;
    }

    public static void Log(string _event, string value)
    {
        Tracking tracking = new Tracking(DateTime.Now, _event, value);
        Debug.Log(tracking);
        Instance.Send(tracking);
    }

    public void Send(Tracking tracking)
    {
        User user = TrainingManager.Instance.CurrentUser;
        Task currentTask = TrainingManager.Instance.CurrentTask;
        TrainingModule trainingModule = TrainingManager.Instance.TrainingModule;
        StartCoroutine(ApiService.SubmitTaskTracking(tracking, user.Id, currentTask.Id, trainingModule.Id, (obj) =>
        {
            if (obj is BackendErrorResponse error)
            {
                Debug.LogError($"Error submitting tracking {error.Status}: {error.Message}");
            }
        }));
    }
}
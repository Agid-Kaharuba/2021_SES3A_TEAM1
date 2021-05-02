using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using UnityEngine;
using UnityEngine.Networking;
using Valve.Newtonsoft.Json;
using Valve.Newtonsoft.Json.Linq;

public class ApiService
{
    static string API_HOST = "http://localhost:4000";
    string token;

    public ApiService(string token)
    {
        this.token = token;
    }

    public IEnumerator Register(User user, Action<object> callback = null)
    {
        string jsonString = JsonConvert.SerializeObject(user);

        UnityWebRequest www = UnityWebRequest.Post($"{API_HOST}/auth/register", jsonString);
        yield return www.SendWebRequest();

        if (www.result != UnityWebRequest.Result.Success)
        {
            BackendErrorResponse response = JsonConvert.DeserializeObject<BackendErrorResponse>(www.downloadHandler.text);
            response.Status = www.responseCode;
            callback?.Invoke(response);
        }
        else
        {
            callback?.Invoke(JsonConvert.DeserializeObject<User>(www.downloadHandler.text));
        }
    }

    public IEnumerator Login(User user, Action<object> callback = null)
    {
        UnityWebRequest www = UnityWebRequest.Post($"{API_HOST}/auth/login", JsonConvert.SerializeObject(user));
        yield return www.SendWebRequest();

        if (www.result != UnityWebRequest.Result.Success)
        {
            BackendErrorResponse response = JsonConvert.DeserializeObject<BackendErrorResponse>(www.downloadHandler.text);
            response.Status = www.responseCode;
            callback?.Invoke(response);
        }
        else
        {
            callback?.Invoke(JsonConvert.DeserializeObject<User>(www.downloadHandler.text));
        }
    }

    public IEnumerator HasAuth(Action<bool> callback = null)
    {
        UnityWebRequest www = UnityWebRequest.Get($"{API_HOST}/auth");
        www.SetRequestHeader("Authorization", $"Bearer {token}");
        yield return www.SendWebRequest();

        if (www.result != UnityWebRequest.Result.Success)
        {
            callback?.Invoke(false);
        }
        else
        {
            callback?.Invoke(true);
        }
    }

    public IEnumerator GetTrainingModule(string courseId, Action<object> callback = null)
    {
        UnityWebRequest www = UnityWebRequest.Get($"{API_HOST}/course/{courseId}");
        www.SetRequestHeader("Authorization", $"Bearer {token}");
        yield return www.SendWebRequest();

        if (www.result != UnityWebRequest.Result.Success)
        {
            BackendErrorResponse response = JsonConvert.DeserializeObject<BackendErrorResponse>(www.downloadHandler.text);
            response.Status = www.responseCode;
            callback?.Invoke(response);
        }
        else
        {
            callback?.Invoke(JsonConvert.DeserializeObject<TrainingModule>(www.downloadHandler.text));
        }
    }
}
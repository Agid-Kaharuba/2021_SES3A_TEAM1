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

    // Get the current user using the token.
    public IEnumerator GetCurrentUser(Action<object> callback = null)
    {
        UnityWebRequest www = UnityWebRequest.Get($"{API_HOST}/user");
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
            callback?.Invoke(JsonConvert.DeserializeObject<User>(www.downloadHandler.text));
        }
    }

    public IEnumerator GetUser(string userId, Action<object> callback = null)
    {
        UnityWebRequest www = UnityWebRequest.Get($"{API_HOST}/user/{userId}");
        www.SetRequestHeader("Authorization", $"Bearer {token}");
        yield return www.SendWebRequest();

        if (www.result != UnityWebRequest.Result.Success)
        {
            BackendErrorResponse response = JsonConvert.DeserializeObject<BackendErrorResponse>(www.downloadHandler.text);
            
            // If the backend returns a non-json (like empty text), then response would be null
            if (response != null)
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

            // If the backend returns a non-json (like empty text), then response would be null
            if (response != null)
                response.Status = www.responseCode;
            callback?.Invoke(response);
        }
        else
        {
            //Debug.Log(www.downloadHandler.text);
            TrainingModule module = JsonConvert.DeserializeObject<TrainingModule>(www.downloadHandler.text);
            //Debug.Log(module);
            callback?.Invoke(module);
        }
    }

    public IEnumerator UpdateTrainingModule(TrainingModule course, Action<object> callback = null)
    {
        string jsonString = JsonConvert.SerializeObject(course);

        UnityWebRequest www = UnityWebRequest.Put($"{API_HOST}/course/{course.Id}", jsonString);
        www.SetRequestHeader("Authorization", $"Bearer {token}");
        www.SetRequestHeader("Content-Type", "application/json");
        yield return www.SendWebRequest();

        if (www.result != UnityWebRequest.Result.Success)
        {
            BackendErrorResponse response = JsonConvert.DeserializeObject<BackendErrorResponse>(www.downloadHandler.text);

            // If the backend returns a non-json (like empty text), then response would be null
            if (response != null)
                response.Status = www.responseCode;
            callback?.Invoke(response);
        }
        else
        {
            callback?.Invoke(null);
        }
    }

    public IEnumerator CreateTask(Task task, Action<object> callback = null)
    {
        string jsonString = JsonConvert.SerializeObject(task);

        UnityWebRequest www = UnityWebRequest.Post($"{API_HOST}/task", jsonString);
        www.SetRequestHeader("Authorization", $"Bearer {token}");
        www.SetRequestHeader("Content-Type", "application/json");
        yield return www.SendWebRequest();

        if (www.result != UnityWebRequest.Result.Success)
        {
            BackendErrorResponse response = JsonConvert.DeserializeObject<BackendErrorResponse>(www.downloadHandler.text);
            response.Status = www.responseCode;
            callback?.Invoke(response);
        }
        else
        {
            callback?.Invoke(null);
        }
    }

    public IEnumerator UpdateTask(Task task, Action<object> callback = null)
    {
        string jsonString = JsonConvert.SerializeObject(task);

        UnityWebRequest www = UnityWebRequest.Put($"{API_HOST}/recipe/{task.Id}", jsonString);
        www.SetRequestHeader("Authorization", $"Bearer {token}");
        www.SetRequestHeader("Content-Type", "application/json");
        yield return www.SendWebRequest();

        if (www.result != UnityWebRequest.Result.Success)
        {
            BackendErrorResponse response = JsonConvert.DeserializeObject<BackendErrorResponse>(www.downloadHandler.text);
            response.Status = www.responseCode;
            callback?.Invoke(response);
        }
        else
        {
            callback?.Invoke(null);
        }
    }

    public IEnumerator CreateRecipe(Recipe recipe, Action<object> callback = null)
    {
        string jsonString = JsonConvert.SerializeObject(recipe);

        UnityWebRequest www = UnityWebRequest.Post($"{API_HOST}/recipe", jsonString);
        www.SetRequestHeader("Authorization", $"Bearer {token}");
        www.SetRequestHeader("Content-Type", "application/json");
        yield return www.SendWebRequest();

        if (www.result != UnityWebRequest.Result.Success)
        {
            BackendErrorResponse response = JsonConvert.DeserializeObject<BackendErrorResponse>(www.downloadHandler.text);
            response.Status = www.responseCode;
            callback?.Invoke(response);
        }
        else
        {
            callback?.Invoke(null);
        }
    }

    public IEnumerator UpdateRecipe(Recipe recipe, Action<object> callback = null)
    {
        string jsonString = JsonConvert.SerializeObject(recipe);

        UnityWebRequest www = UnityWebRequest.Put($"{API_HOST}/recipe/{recipe.Id}", jsonString);
        www.SetRequestHeader("Authorization", $"Bearer {token}");
        www.SetRequestHeader("Content-Type", "application/json");
        yield return www.SendWebRequest();

        if (www.result != UnityWebRequest.Result.Success)
        {
            BackendErrorResponse response = JsonConvert.DeserializeObject<BackendErrorResponse>(www.downloadHandler.text);
            response.Status = www.responseCode;
            callback?.Invoke(response);
        }
        else
        {
            callback?.Invoke(null);
        }
    }

    public IEnumerator SubmitTaskProgress(Progress progress, Action<object> callback = null)
    {
        string jsonString = JsonConvert.SerializeObject(progress);

        UnityWebRequest www = UnityWebRequest.Put($"{API_HOST}/progress", jsonString);
        www.SetRequestHeader("Content-Type", "application/json");
        yield return www.SendWebRequest();

        if (www.result != UnityWebRequest.Result.Success)
        {
            BackendErrorResponse response = JsonConvert.DeserializeObject<BackendErrorResponse>(www.downloadHandler.text);
            response.Status = www.responseCode;
            callback?.Invoke(response);
        }
        else
        {
            callback?.Invoke(JsonConvert.DeserializeObject<Progress>(www.downloadHandler.text));
        }
    }
}
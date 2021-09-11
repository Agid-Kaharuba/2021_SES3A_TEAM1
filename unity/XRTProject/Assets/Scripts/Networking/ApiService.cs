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
    private static string API_HOST = "http://ec2-13-55-156-75.ap-southeast-2.compute.amazonaws.com:4000";
    private string token;

    public ApiService(string token)
    {
        this.token = token;
    }

    private ApiRequest SendRequest(string path, HTTPRequestType requestType)
    {
        return new ApiRequest(API_HOST, path, requestType);
    }

    private ApiRequest SendAuthenticatedRequest(string path, HTTPRequestType requestType)
    {
        return new ApiRequest(API_HOST, path, requestType).WithToken(token);
    }

    public IEnumerator Register(User user, Action<object> callback = null)
    {
        ApiRequest apiRequest = SendAuthenticatedRequest($"auth/register", HTTPRequestType.Get)
            .HandleError(callback)
            .HandleJsonResponse<User>(callback);
        yield return apiRequest.Execute();
    }

    public IEnumerator Login(User user, Action<object> callback = null)
    {
        ApiRequest apiRequest = SendRequest($"auth/login", HTTPRequestType.Get)
            .HandleError(callback)
            .HandleJsonResponse<User>(callback);
        yield return apiRequest.Execute();
    }

    // Get the current user using the token.
    public IEnumerator GetCurrentUser(Action<object> callback = null)
    {
        ApiRequest apiRequest = SendAuthenticatedRequest($"user", HTTPRequestType.Get)
            .HandleError(callback)
            .HandleJsonResponse<User>(callback);
        yield return apiRequest.Execute();
    }

    public IEnumerator GetUser(string userId, Action<object> callback = null)
    {
        ApiRequest apiRequest = SendAuthenticatedRequest($"user/{userId}", HTTPRequestType.Get)
            .HandleError(callback)
            .HandleJsonResponse<User>(callback);
        yield return apiRequest.Execute();
    }

    public IEnumerator HasAuth(Action<bool> callback = null)
    {
        ApiRequest apiRequest = SendAuthenticatedRequest($"auth", HTTPRequestType.Get);
        yield return apiRequest.Execute();
        callback?.Invoke(apiRequest.IsSuccessful);
    }

    public IEnumerator GetTrainingModule(string courseId, Action<object> callback = null)
    {
        ApiRequest apiRequest = SendAuthenticatedRequest($"course/{courseId}", HTTPRequestType.Get)
            .HandleJsonResponse<TrainingModule>(callback)
            .HandleError(callback);
        yield return apiRequest.Execute();
    }

    public IEnumerator UpdateTrainingModule(TrainingModule course, Action<object> callback = null)
    {
        ApiRequest apiRequest = SendAuthenticatedRequest($"course/{course.Id}", HTTPRequestType.Put)
            .SendJson(course)
            .HandleError(callback);
        yield return apiRequest.Execute();
    }

    public IEnumerator CreateTask(Task task, Action<object> callback = null)
    {
        ApiRequest apiRequest = SendAuthenticatedRequest("task", HTTPRequestType.Put)
            .SendJson(task)
            .HandleJsonResponse<Task>(callback)
            .HandleError(callback);
        yield return apiRequest.Execute();
    }

    public IEnumerator UpdateTask(Task task, Action<object> callback = null)
    {
        ApiRequest apiRequest = SendAuthenticatedRequest($"task/{task.Id}", HTTPRequestType.Put)
            .SendJson(task)
            .HandleError(callback);
        yield return apiRequest.Execute();
    }

    public IEnumerator CreateRecipe(Recipe recipe, Action<object> callback = null)
    {
        ApiRequest apiRequest = SendAuthenticatedRequest("recipe", HTTPRequestType.Put)
            .SendJson(recipe)
            .HandleJsonResponse<Recipe>(callback)
            .HandleError(callback);
        yield return apiRequest.Execute();
    }

    public IEnumerator UpdateRecipe(Recipe recipe, Action<object> callback = null)
    {
        ApiRequest apiRequest = SendAuthenticatedRequest($"recipe/{recipe.Id}", HTTPRequestType.Put)
            .SendJson(recipe)
            .HandleError(callback);
        yield return apiRequest.Execute();
    }

    public IEnumerator SubmitTaskProgress(Progress progress, Action<object> callback = null)
    {
        ApiRequest apiRequest = SendAuthenticatedRequest("progress", HTTPRequestType.Put)
            .SendJson(progress)
            .HandleJsonResponse<Progress>(callback)
            .HandleError(callback);
        yield return apiRequest.Execute();
    }
}
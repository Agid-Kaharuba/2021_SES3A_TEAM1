using System;
using System.Collections;
using UnityEngine;
using UnityEngine.Networking;
using Valve.Newtonsoft.Json;


public class ApiRequest
{
    private string host;
    private string path;
    private HTTPRequestType requestType;
    private string token;
    private string payload = string.Empty;
    private Action<UnityWebRequest> responseAction = null;
    private Action<BackendErrorResponse> errorAction = null;
    private Action<string> responsePayload = null;
    
    public bool ShouldIgnoreErrors { get; private set; }
    public bool HasJsonPayload { get; private set; }
    public bool IsSuccessful { get; private set; }
    public UnityWebRequest Request { get; private set; }
    public bool HasToken => !string.IsNullOrEmpty(token);

    public ApiRequest(string host, string path, HTTPRequestType requestType)
    {
        this.host = host;
        this.path = path;
        this.requestType = requestType;
    }

    public static ApiRequest CreateRequest(string host, string path, HTTPRequestType requestType)
    {
        return new ApiRequest(host, path, requestType);
    }

    public ApiRequest WithToken(string token)
    {
        this.token = token;
        return this;
    }

    public ApiRequest SendString(string payload)
    {
        this.payload = payload;
        return this;
    }

    public ApiRequest SendJson(object payload)
    {
        this.payload = JsonConvert.SerializeObject(payload);
        HasJsonPayload = true;
        return this;
    }

    public ApiRequest HandleResponse(Action<object> responsePayload)
    {
        this.responsePayload = responsePayload;
        return this;
    }

    public ApiRequest HandleJsonResponse<T>(Action<T> responsePayload)
    {
        this.responsePayload = (p) => JsonConvert.DeserializeObject<T>(p);
        return this;
    }

    public ApiRequest HandleError(Action<BackendErrorResponse> errorAction)
    {
        this.errorAction = errorAction;
        return this;
    }

    public ApiRequest IgnoreErrors()
    {
        this.ShouldIgnoreErrors = true;
        return this;
    }

    public IEnumerator Execute()
    {
        switch (requestType)
        {
            case HTTPRequestType.Get:
                Request = UnityWebRequest.Get($"{host}/{path}");
                break;
            case HTTPRequestType.Post:
                Request = UnityWebRequest.Post($"{host}/{path}", payload);
                break;
            case HTTPRequestType.Put:
                Request = UnityWebRequest.Put($"{host}/{path}", payload);
                break;
            case HTTPRequestType.Delete:
                Request = UnityWebRequest.Delete($"{host}/{path}");
                break;
        }

        if (Request == null)
            throw new NotImplementedException($"Unsupported request");
        
        if (HasToken)
            Request.SetRequestHeader("Authorization", $"Bearer {token}");
        
        if (HasJsonPayload)
            Request.SetRequestHeader("Content-Type", "application/json");
        
        yield return Request.SendWebRequest();

        IsSuccessful = Request.result == UnityWebRequest.Result.Success;

        if (responseAction != null)
        {
            responseAction(Request);
        }

        if (responsePayload != null)
        {
            if (Request.result != UnityWebRequest.Result.Success)
            {
                BackendErrorResponse response = JsonConvert.DeserializeObject<BackendErrorResponse>(Request.downloadHandler.text);
                // If the backend returns a non-json (like empty text), then response would be null
                if (response == null)
                    response = new BackendErrorResponse();
            
                response.Status = Request.responseCode;

                if (!ShouldIgnoreErrors)
                {
                    if (errorAction != null)
                        errorAction(response);
                    else
                        Debug.LogError($"Failed Api request: {response}");
                }
            }
            else
            {
                responsePayload.Invoke(Request.downloadHandler.text);
            }
        }
    }
}
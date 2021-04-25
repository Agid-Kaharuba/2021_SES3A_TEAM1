using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.Networking;

public static class ApiHelper
{
    static string API_HOST = "http://localhost:4000";

    public static IEnumerator GetRoot()
    {
        UnityWebRequest www = UnityWebRequest.Get(API_HOST);
        yield return www.SendWebRequest();

        if (www.result != UnityWebRequest.Result.Success)
        {
            Debug.Log(www.error);
        }
        else
        {
            Debug.Log(www.downloadHandler.text);
        }
    }
}

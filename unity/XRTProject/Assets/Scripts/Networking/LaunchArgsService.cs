using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using Training;
using UnityEngine;

static class LaunchArgsService
{
    public static string GetArgs()
    {
        string[] arguments = Environment.GetCommandLineArgs();
        return arguments.Length >= 1 ? arguments[1] : string.Empty;
    }

    private static Dictionary<string, string> GetParams()
    {
        Dictionary<string, string> dict = new Dictionary<string, string>();

        try
        {
            string[] addressParameter = GetArgs().Split('?');
            if (addressParameter.Length > 0)
            {
                string[] parameters = addressParameter[1].Split('&');
                foreach (string parameter in parameters)
                {
                    try
                    {
                        dict.Add(parameter.Split('=')[0], parameter.Split('=')[1]);
                    }
                    catch (Exception e)
                    {
                        Debug.LogError(e);
                    }
                }
            }
        }
        catch (Exception e)
        {
            Debug.LogWarning("Failed to parse env parameters!");
        }
        
        return dict;
    }

    public static string GetModuleId()
    {
        var envParams = GetParams();
        
        if (envParams.ContainsKey("courseId"))
        {
            return envParams["courseId"];
        }
        else
        {
            DevToken devToken = GetDevToken();

            if (devToken == null)
                throw new Exception("No available module Id to get from!");
            
            Debug.LogWarning("Taking module Id from DevToken...");
            return devToken.ModuleId;
        }
    }

    public static string GetToken()
    {
        var envParams = GetParams();
        
        if (envParams.ContainsKey("token"))
        {
            return envParams["token"];
        }
        else
        {
            DevToken devToken = GetDevToken();

            if (devToken == null)
                throw new Exception("No available token to get from!");
            
            Debug.LogWarning("Taking token from DevToken...");
            return devToken.Token;
        }
    }
    
    private static DevToken GetDevToken()
    {
#if UNITY_EDITOR
        return UnityEditor.AssetDatabase.LoadAssetAtPath<DevToken>("DevToken.asset");
#else
        return null;
#endif
    }
}


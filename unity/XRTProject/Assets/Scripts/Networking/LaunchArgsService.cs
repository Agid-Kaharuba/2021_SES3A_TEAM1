using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using UnityEngine;

static class LaunchArgsService
{
    public static string GetArgs()
    {
        string[] arguments = Environment.GetCommandLineArgs();
        return arguments[1];
        // return "xrt-training:?courseId=a41d3b&token";
    }

    private static Dictionary<string, string> GetParams()
    {
        // xrt-training:?token=a41d3b&courseId=a3b1c
        Dictionary<string, string> dict = new Dictionary<string, string>();
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

        return dict;
    }

    public static string GetModuleId()
    {
        return GetParams().ContainsKey("courseId") ? GetParams()["courseId"] : "";
    }

    public static string GetToken()
    {
        return GetParams().ContainsKey("token") ? GetParams()["token"] : "";
    }
}


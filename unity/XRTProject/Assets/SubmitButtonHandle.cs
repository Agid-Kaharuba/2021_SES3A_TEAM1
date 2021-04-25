using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.Networking;

public class SubmitButtonHandle : MonoBehaviour
{
    public void OnClickHandle()
    {
        StartCoroutine(ApiHelper.GetRoot());
    }
}

using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class ApiHandler : MonoBehaviour
{
    private ApiService apiService;
    // Start is called before the first frame update
    void Start()
    {
        apiService = new ApiService("");
    }

    // Update is called once per frame
    void Update()
    {
        
    }

    public void OnClick()
    {
        Progress p = new Progress("asdfasdf", "tester", "abc", false, 22);
        StartCoroutine(apiService.SubmitTaskProgress(p, (response) =>
        {
            if (response is BackendErrorResponse errorReponse)
            {
                Debug.LogError($"Could not get training module got {errorReponse.Message}");
            }
            else if (response is Progress progress)
            {

            }
        }));
    }
}

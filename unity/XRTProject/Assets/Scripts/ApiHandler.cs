using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class ApiHandler : MonoBehaviour
{
    private ApiService apiService;
    // Start is called before the first frame update
    void Start()
    {
        apiService = new ApiService();
    }

    // Update is called once per frame
    void Update()
    {
        
    }

    public void OnClick()
    {
        StartCoroutine(apiService.Login(new User("test", "test"), (theObject) => {
            if (theObject is BackendErrorResponse errorReponse)
            {

            }
            else if (theObject is User user)
            {

            }
        }));
    }
}

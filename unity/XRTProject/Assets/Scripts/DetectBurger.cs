using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class DetectBurger : MonoBehaviour
{
    // Start is called before the first frame update
    void Start()
    {
        
    }

    // Update is called once per frame
    void Update()
    {
        
    }

    private void OnTriggerEnter(Collider collider)
    {
        if (collider.gameObject.CompareTag("Plates"))
        {
            Debug.Log("Collision Detected");
            Destroy(collider.gameObject);
        }
    }
}

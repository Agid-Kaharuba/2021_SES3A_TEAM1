using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class FromFridgeToScene : MonoBehaviour
{

    
    void OnCollisionExit(Collision collision)
    {

        if (collision.gameObject.name == "MainFridge")
        {
            gameObject.transform.parent = GameObject.Find("ItemsFromTheFridge").transform;
        }
        
    }
}

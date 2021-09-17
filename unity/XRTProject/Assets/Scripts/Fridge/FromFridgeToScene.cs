using System;
using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class FromFridgeToScene : MonoBehaviour {

    private List<GameObject> startItems = new List<GameObject> ();
    private List<GameObject> removedItems = new List<GameObject> ();
    private List<Transform> ItemsPosition = new List<Transform>();
    private GameObject itemsInFridge;

    private void Start () {
        RegisterInitialItems ();
    }

    private void OnTriggerExit ( Collider other ) {
        if ( other.transform.tag == "Ingredient" ) {
            removedItems.Add ( other.gameObject );
            startItems.Remove ( other.gameObject );
        }
    }

    private void OnTriggerEnter ( Collider other ) {
        if ( other.transform.tag == "Ingredient" ) {
            removedItems.Remove ( other.gameObject );
            startItems.Add ( other.gameObject );
        }
    }

    private void RegisterInitialItems () {
        itemsInFridge = GameObject.Find ( "ItemsInTheFridge" );
        for ( int i = 0; i < itemsInFridge.transform.childCount; i++ ) {
            GameObject childA = itemsInFridge.transform.GetChild ( i ).gameObject;
            for ( int j = 0; j < childA.transform.childCount; j++ ) {
                GameObject childB = childA.transform.GetChild( j ).gameObject;
                Transform position = childB.gameObject.transform;
                startItems.Add ( childB );
                ItemsPosition.Add(position);
            }
        }
    }

    private void Rmoved()
    {
        
    }

}

using System;
using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class FromFridgeToScene : MonoBehaviour {

    //private List<GameObject> startItems = new List<GameObject> ();
    //private List<GameObject> removedItems = new List<GameObject> ();
    //private List<Transform> ItemsPositionStart = new List<Transform>();
    //private List<Transform> ItemsPositionRemoved = new List<Transform>();
    //private GameObject itemsInFridge;
    public GameObject button;

    private void Start () {
        //RegisterInitialItems ();
    }

    private void OnTriggerExit ( Collider other ) {
        if ( other.transform.tag == "Ingredient" ) {
            //removedItems.Add ( other.gameObject );
            //startItems.Remove ( other.gameObject );
            //ItemsPositionStart.Remove(other.gameObject.transform);
            //ItemsPositionRemoved.Add(other.gameObject.transform);
            button.GetComponent<FridgeController>().AddItemsToReset(other.gameObject, other.gameObject.transform);
        }
    }

    private void OnTriggerEnter ( Collider other ) {
        if ( other.transform.tag == "Ingredient" ) {
            //removedItems.Remove ( other.gameObject );
            //startItems.Add ( other.gameObject );
            //ItemsPositionStart.Add(other.gameObject.transform);
            //ItemsPositionRemoved.Remove(other.gameObject.transform);
            button.GetComponent<FridgeController>().RemoveItemsToReset(other.gameObject, other.gameObject.transform);
        }
    }
    /**
    private void RegisterInitialItems () {
        itemsInFridge = GameObject.Find ( "ItemsInTheFridge" );
        for ( int i = 0; i < itemsInFridge.transform.childCount; i++ ) {
            GameObject childA = itemsInFridge.transform.GetChild ( i ).gameObject;
            for ( int j = 0; j < childA.transform.childCount; j++ ) {
                GameObject childB = childA.transform.GetChild( j ).gameObject;
                Transform position = childB.gameObject.transform;
                startItems.Add ( childB );
                ItemsPositionStart.Add(position);
            }
        }
    }
    **/

    

}

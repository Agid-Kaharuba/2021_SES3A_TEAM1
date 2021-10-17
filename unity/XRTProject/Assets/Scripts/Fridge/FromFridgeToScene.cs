using System;
using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class FromFridgeToScene : MonoBehaviour {

    private List<GameObject> startItems = new List<GameObject> ();
    private List<GameObject> removedItems = new List<GameObject> ();
    private List<Vector3> ItemsPositionStart = new List<Vector3>();
    private List<Quaternion> ItemsRotationStart = new List<Quaternion>();

    //private List<Transform> ItemsPositionRemoved = new List<Transform>();

    private GameObject itemsInFridge;
    public GameObject button;

    public void Start () {

        RegisterInitialItems();
    }

    public void OnTriggerExit ( Collider other ) {
        if ( other.transform.tag == "Ingredient" ) {
            button.GetComponent<FridgeController>().AddItemsToReset(other.gameObject);
        }
    }

    /**
    public void OnTriggerEnter ( Collider other ) {
        if ( other.transform.tag == "Ingredient" ) {
            removedItems.Remove ( other.gameObject );
            startItems.Add ( other.gameObject );
            //ItemsPositionStart.Add(other.gameObject.transform);
            //ItemsPositionRemoved.Remove(other.gameObject.transform);
            //button.GetComponent<FridgeController>().RemoveItemsToReset(other.gameObject, other.gameObject.transform);
        }
    }
    **/
    
    private void RegisterInitialItems () {
        itemsInFridge = GameObject.Find ( "ItemsInTheFridge" );
        for ( int i = 0; i < itemsInFridge.transform.childCount; i++ ) {
            GameObject childA = itemsInFridge.transform.GetChild ( i ).gameObject;
            for ( int j = 0; j < childA.transform.childCount; j++ ) {
                GameObject childB = childA.transform.GetChild( j ).gameObject;
                Vector3 position = childB.gameObject.transform.position;
                Quaternion rotation = childB.gameObject.transform.rotation;
                startItems.Add ( childB );
                ItemsPositionStart.Add(position);
                ItemsRotationStart.Add(rotation);
                button.GetComponent<FridgeController>().AddItems(childB, position, rotation);
            }
        }
    }
    

    

}

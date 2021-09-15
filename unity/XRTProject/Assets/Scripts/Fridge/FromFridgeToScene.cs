using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class FromFridgeToScene : MonoBehaviour {

    private List<GameObject> startItems = new List<GameObject> ();
    private List<GameObject> removedItems = new List<GameObject> ();

    private GameObject itemsInFridge;

    private void Start () {
        RegisterInitialItems ();
    }

    private void OnTriggerExit ( Collider other ) {
        if ( other.transform.tag == "Ingredient" ) {
            Debug.Log ( "EXIT: " + other.gameObject.name );
            removedItems.Add ( other.gameObject );
            startItems.Remove ( other.gameObject );
        }
    }

    private void OnTriggerEnter ( Collider other ) {
        if ( other.transform.tag == "Ingredient" ) {
            Debug.Log ( "ENTER: " + other.gameObject.name );
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
                startItems.Add ( childB );
            }
        }
    }

}

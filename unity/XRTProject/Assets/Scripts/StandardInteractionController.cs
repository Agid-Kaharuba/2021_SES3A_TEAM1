using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class StandardInteractionController : MonoBehaviour {

    private GrillController grill;
    private BucketController bucket;

    void Start() {
        grill = GameObject.Find ( "Grill" ).GetComponent<GrillController> ();
        bucket = GameObject.Find ( "MopBucket" ).GetComponent<BucketController> ();
    }

    void Update() {
        if ( Input.GetMouseButtonDown ( 0 ) ) { // if left button pressed
            Ray ray = Camera.main.ScreenPointToRay ( Input.mousePosition );
            RaycastHit hit;
            if ( Physics.Raycast ( ray, out hit ) ) {
                if ( hit.transform.gameObject == GameObject.Find ( "grill_knob" ) ) {
                    grill.ToggleGrill ();
                    Debug.Log ( "Grill" );
                }
                if ( hit.transform.gameObject == GameObject.Find ( "MopBucket" ) ) {
                    bucket.ToggleBucket ();
                    Debug.Log ( "bucket" );
                }
            }
        }
    }
}

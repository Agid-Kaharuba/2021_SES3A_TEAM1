using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class StandardInteractionController : MonoBehaviour {

    private GrillController grill;

    void Start() {
        grill = GameObject.Find ( "grill" ).GetComponent<GrillController> ();
    }

    void Update() {
        if ( Input.GetMouseButtonDown ( 0 ) ) { // if left button pressed
            Ray ray = Camera.main.ScreenPointToRay ( Input.mousePosition );
            RaycastHit hit;
            if ( Physics.Raycast ( ray, out hit ) ) {
                if ( hit.transform.gameObject == GameObject.Find ( "grill_knob.001" ) ) {
                    grill.ToggleGrill ();
                }
            }
        }
    }
}

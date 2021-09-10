using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class SpatulaController : MonoBehaviour {

    private Transform spatulaTip;
    private Transform spatulaStop;
    private GameObject collidedObject;

    void Start() {
        //spatulaTip = gameObject.transform.Find ( "spatulaTip" ).gameObject.transform;
        //spatulaStop = gameObject.transform.Find ( "spatulaStop" ).gameObject.transform;
    }

    void Update() {
        
    }

    void OnSpatulaTipHit () {

    }

    private void OnTriggerEnter ( Collider other ) {
        collidedObject = GameObject.Find ( other.gameObject.name );
        collidedObject.transform.position += new Vector3 ( 0, 2, 0 );
        if ( other.tag == "interactable" ) {
            
        }
    }
}

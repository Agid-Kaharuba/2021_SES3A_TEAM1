using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class BucketController : MonoBehaviour {

    Animator anim;

    void Start() {
        anim = gameObject.GetComponent<Animator> ();
    }

    void Update() {
        
    }

    public void ToggleBucket() {
        if ( anim.GetBool( "bucketOpen" ) ) {
            anim.SetBool ( "bucketOpen", false );
        } else {
            anim.SetBool ( "bucketOpen", true );
        }
    }
}

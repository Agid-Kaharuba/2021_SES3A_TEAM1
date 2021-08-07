using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class PlayerSwitcher : MonoBehaviour {

    public bool nonVRTesting;

    private GameObject standardPlayer;
    private GameObject VRPlayer;

    void Start () {
        standardPlayer = gameObject.transform.Find( "2D-Player" ).gameObject;
        VRPlayer = gameObject.transform.Find ( "VR-Player" ).gameObject;

        UpdatePlayerMode ();
    }

    void Update() {
        UpdatePlayerMode ();
    }

    void UpdatePlayerMode () {
        if ( nonVRTesting ) {
            standardPlayer.SetActive ( true );
            VRPlayer.SetActive ( false );
        } else {
            standardPlayer.SetActive ( false );
            VRPlayer.SetActive ( true );
        }
    }
}

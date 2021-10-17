using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class SinkController : MonoBehaviour {

    public float activationAngle = 5f;

    private Transform leftHandle;
    private Transform rightHandle;

    private ParticleSystem leftWater;
    private ParticleSystem rightWater;

    void Start() {
        leftWater = gameObject.transform.Find ( "leftWater" ).gameObject.GetComponent<ParticleSystem> ();
        rightWater = gameObject.transform.Find ( "rightWater" ).gameObject.GetComponent<ParticleSystem> ();

        leftHandle = gameObject.transform.Find ( "Handle_L" ).gameObject.transform;
        rightHandle = gameObject.transform.Find ( "Handle_R" ).gameObject.transform;

        leftWater.Stop ();
        rightWater.Stop ();
    }

    void Update() {
        CheckLeftHandle ();
        CheckRightHandle ();
    }

    void CheckLeftHandle () {
        if ( leftHandle.localEulerAngles.x < activationAngle && leftHandle.transform.localEulerAngles.x > -activationAngle ) {
            leftWater.Stop ();
        }  else {
            leftWater.Play ();
        }  
    }

    void CheckRightHandle () {
        if ( rightHandle.localEulerAngles.x < activationAngle && rightHandle.transform.localEulerAngles.x > -activationAngle ) {
            leftWater.Stop ();
        } else {
            leftWater.Play ();
        }
    }
}

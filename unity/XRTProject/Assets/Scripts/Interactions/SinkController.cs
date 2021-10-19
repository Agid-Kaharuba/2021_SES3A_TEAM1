using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class SinkController : MonoBehaviour {

    public float activationAngle = 5f;

    private Transform leftHandle;
    private Transform rightHandle;

    private bool leftHandleSound;
    private bool rightHandleSound;
    private bool leftHandleW;
    private bool rightHandleW;

    private ParticleSystem leftWater;
    private ParticleSystem rightWater;


    void Start() {
        leftWater = gameObject.transform.Find ( "leftWater" ).gameObject.GetComponent<ParticleSystem> ();
        rightWater = gameObject.transform.Find ( "rightWater" ).gameObject.GetComponent<ParticleSystem> ();

        leftHandleSound = false;
        rightHandleSound = false;
        leftHandleW= false;
        rightHandleW= false;

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
            StopSoundL();
        }
        else {
            leftWater.Play ();
            PlaySoundL();

        }
    }

    void CheckRightHandle () {
        if ( rightHandle.localEulerAngles.x < activationAngle && rightHandle.transform.localEulerAngles.x > -activationAngle ) {
            rightWater.Stop ();
            StopSoundR();
        }
        else {
            rightWater.Play ();
            PlaySoundR();
        }
    }
    void PlaySoundL()
    {
        if(leftHandleSound == false)
        {
            leftHandleSound = true;
            FindObjectOfType<AudioManager>().Play("WaterRunL");
        }
        
    }
    void PlaySoundR()
    {
        
        if (rightHandleSound == false)
        {
            rightHandleSound = true;
            FindObjectOfType<AudioManager>().Play("WaterRunR");
        }
    }
    void StopSoundL()
    {
        if (leftHandleSound == true)
        {
            leftHandleSound = false;
            FindObjectOfType<AudioManager>().Stop("WaterRunL");
        }
        
    }
    void StopSoundR()
    {
        
        if (rightHandleSound == true)
        {
            rightHandleSound = false;
            FindObjectOfType<AudioManager>().Stop("WaterRunR");
        }
    }

}

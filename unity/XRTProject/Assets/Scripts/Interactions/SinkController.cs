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
        if ( !IsBetween(leftHandle.localEulerAngles.x, activationAngle, 360-activationAngle) ) {
            leftWater.Stop ();
            StopSoundL();
        }
        else {
            leftWater.Play ();
            PlaySoundL();

        }
    }

    void CheckRightHandle () {
        if ( !IsBetween ( rightHandle.localEulerAngles.x, activationAngle, 360 - activationAngle ) ) {
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

    public bool IsBetween ( double testValue, double bound1, double bound2 ) {
        if ( bound1 > bound2 )
            return testValue >= bound2 && testValue <= bound1;
        return testValue >= bound1 && testValue <= bound2;
    }

}

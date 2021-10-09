using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class MicrowaveController : MonoBehaviour {

    public Light microwaveLight;

    private bool isOpen;
    private bool isRunning;



    public GameObject door;

    public GameObject plate;

    public float microwavePlateSpeed = 20f;

    void Start() {
        microwaveLight.enabled = false;
        isOpen = false;
        isRunning = false;
    }

    void Update() {
        if ( !isOpen && door.transform.eulerAngles.y > 90 )
            OpenMicrowave ();

        if ( isOpen && door.transform.eulerAngles.y == 90 )
            CloseMicrowave ();

        if ( isRunning ) {
            plate.transform.Rotate ( Vector3.up * microwavePlateSpeed * Time.deltaTime );
        }
    }

    void OpenMicrowave () {
        isOpen = true;
        FindObjectOfType<AudioManager>().Play("microwaveOpen");
        EndMicrowave();
        microwaveLight.enabled = true;
    }

    void CloseMicrowave () {
        isOpen = false;
        FindObjectOfType<AudioManager>().Play("microwaveClose");
        RunMicrowave();
        microwaveLight.enabled = false;
    }

    void RunMicrowave () {
        isRunning = true;
        FindObjectOfType<AudioManager>().Play("microwaveNoise");
    }

    void EndMicrowave () {
        isRunning = false;
        FindObjectOfType<AudioManager>().Stop("microwaveNoise");
        FindObjectOfType<AudioManager>().Play("microwaveBeep");
    }

    private void OnTriggerStay ( Collider other ) {
        if ( isRunning ) {
            other.transform.Rotate ( Vector3.up * microwavePlateSpeed * Time.deltaTime );
        }
    }
}

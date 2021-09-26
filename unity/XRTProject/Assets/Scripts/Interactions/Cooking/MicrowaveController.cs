using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class MicrowaveController : MonoBehaviour {

    public AudioClip open;
    public AudioClip close;
    public AudioClip beep;
    public AudioClip end;

    public Light microwaveLight;

    private bool isOpen;
    private bool isRunning;

    public AudioSource audioSource;
    public AudioSource noiseSource;

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
        audioSource.PlayOneShot ( open, 1 );
        EndMicrowave ();
        microwaveLight.enabled = true;
    }

    void CloseMicrowave () {
        isOpen = false;
        audioSource.PlayOneShot ( close, 1 );
        RunMicrowave ();
        microwaveLight.enabled = false;
    }

    void RunMicrowave () {
        isRunning = true;
        noiseSource.Play ();
    }

    void EndMicrowave () {
        isRunning = false;
        noiseSource.Stop ();
        audioSource.PlayOneShot ( beep, 1 );
    }

    private void OnTriggerStay ( Collider other ) {
        if ( isRunning ) {
            other.transform.Rotate ( Vector3.up * microwavePlateSpeed * Time.deltaTime );
        }
    }
}

using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class MicrowaveController : MonoBehaviour {

    public Light microwaveLight;

    private bool isOpen;
    private bool isRunning;

    public GameObject door;
    public GameObject plate;

    private CookZone cookZone;

    public float microwavePlateSpeed = 20f;

    void Start() {
        microwaveLight.enabled = true;
        isOpen = false;
        isRunning = false;
        cookZone = gameObject.GetComponent<CookZone> ();
        cookZone.SetCanCook ( false );
    }

    void Update() {
        if ( !isOpen && door.transform.localEulerAngles.y > 90 )
            OpenMicrowave ();

        if ( isOpen && door.transform.localEulerAngles.y == 90 )
            CloseMicrowave ();

        if ( isRunning ) {
            plate.transform.Rotate ( Vector3.up * microwavePlateSpeed * Time.deltaTime );
        }
    }

    void OpenMicrowave () {
        isOpen = true;
        FindObjectOfType<AudioManager>().Play( "microwaveOpen" );
        EndMicrowave();
        microwaveLight.enabled = false;
    }

    void CloseMicrowave () {
        isOpen = false;
        FindObjectOfType<AudioManager>().Play("microwaveClose");
        RunMicrowave();
        microwaveLight.enabled = true;
    }

    void RunMicrowave () {
        isRunning = true;
        FindObjectOfType<AudioManager>().Play("microwaveNoise");
        cookZone.SetCanCook ( true );
    }

    void EndMicrowave () {
        isRunning = false;
        FindObjectOfType<AudioManager>().Stop("microwaveNoise");
        FindObjectOfType<AudioManager>().Play("microwaveBeep");
        cookZone.SetCanCook ( false );
    }

    private void OnTriggerStay ( Collider other ) {
        if ( isRunning ) {
            other.transform.Rotate ( Vector3.up * microwavePlateSpeed * Time.deltaTime );
        }
    }
}

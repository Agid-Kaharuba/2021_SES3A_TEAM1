using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class Oven_controller : MonoBehaviour
{
    public AudioClip open;
    public AudioClip close;
    //public AudioClip beep;
    public AudioClip end;

    public Light ovenLight;

    private bool isOpen;
    private bool isRunning;

    public AudioSource audioSource;
    public AudioSource noiseSource;

    public GameObject door;

    //public GameObject gril;

    //public float temperature;

    void Start()
    {
        ovenLight.enabled = false;
        isOpen = false;
        isRunning = false;
    }

    void Update()
    {
        if (!isOpen && door.transform.eulerAngles.x > 0)
            OpenOven();

        if (isOpen && door.transform.eulerAngles.x == 0)
            CloseOven();

        if (isRunning)
        {
            //plate.transform.Rotate(Vector3.up * microwavePlateSpeed * Time.deltaTime);
        }
    }

    void OpenOven()
    {
        isOpen = true;
        audioSource.PlayOneShot(open, 1);
        EndOven();
        ovenLight.enabled = true;
    }

    void CloseOven()
    {
        isOpen = false;
        audioSource.PlayOneShot(close, 1);
        RunOven();
        ovenLight.enabled = false;
    }

    void RunOven()
    {
        isRunning = true;
        noiseSource.Play();
    }

    void EndOven()
    {
        isRunning = false;
        noiseSource.Stop();
        //audioSource.PlayOneShot(beep, 1);
    }

    private void OnTriggerStay(Collider other)
    {
        if (isRunning)
        {
            //other.transform.Rotate(Vector3.up * microwavePlateSpeed * Time.deltaTime);
        }
    }
}
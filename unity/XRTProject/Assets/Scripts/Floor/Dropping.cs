using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class Dropping : MonoBehaviour
{
    bool platesDroppSound = false;
    bool foodDroppSound = false;

    // Start is called before the first frame update
    private void OnTriggerEnter(Collider other)
    {
        if (other.gameObject.tag == "Ingredient")
        {
            PlayFoodFall();
        }
        if (other.gameObject.tag == "Plates")
        {
            PlayPlatesFall();
        }

    }

    void PlayPlatesFall()
    {
        FindObjectOfType<AudioManager>().Play("DropPlates");
    }
    void PlayFoodFall()
    {
        FindObjectOfType<AudioManager>().Play("DropFood");
    }
}

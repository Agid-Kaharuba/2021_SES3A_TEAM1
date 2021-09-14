using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.VFX;

public class GrillController : MonoBehaviour {

    Renderer rend;
    VisualEffect steamEffect;
    private bool poweredOn = false;
    private AudioSource click;

    void Start() {
        rend = GameObject.Find("grill").GetComponent<Renderer> ();
        steamEffect = GameObject.Find ( "Steam" ).GetComponent<VisualEffect> ();
        click = gameObject.GetComponent<AudioSource> ();
    }

    IEnumerator ToggleGrill () {
        click.Play ();

        yield return new WaitForSeconds ( 0.5f );
            
        if ( poweredOn ) {
            rend.material.SetColor ( "_EmissiveColor", Color.red * 1000f );
            steamEffect.enabled = false;
            poweredOn = false;
            Track.Log("GRILL", "OFF");
        } else {
            rend.material.SetColor ( "_EmissiveColor", Color.green * 1000f );
            steamEffect.enabled = true;
            poweredOn = true;
            Track.Log("GRILL", "ON");
        }

        yield return null;
    }

    public void TogglePower () {
        StartCoroutine ( ToggleGrill () );
    }
}

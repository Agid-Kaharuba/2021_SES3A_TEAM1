using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class GrillController : MonoBehaviour {

    Animator anim;
    Renderer rend;
    GameObject steam;

    void Start() {
        anim = gameObject.GetComponent<Animator> ();
        rend = gameObject.transform.Find("grill").GetComponent<Renderer> ();
        steam = gameObject.transform.Find ( "Steam" ).gameObject;
    }

    void Update() {
        
    }

    public void ToggleGrill() {
        if ( anim.GetBool( "grillOn" ) ) {
            anim.SetBool ( "grillOn", false );
        } else {
            anim.SetBool ( "grillOn", true );
        }

        StartCoroutine ( TogglePower() );
    }

    IEnumerator TogglePower () {
        yield return new WaitForSeconds ( 0.5f );

        if ( anim.GetBool ( "grillOn" ) ) {
            rend.material.SetColor ( "_EmissiveColor", Color.green * 1000f );
            steam.SetActive ( true );
        } else {
            rend.material.SetColor ( "_EmissiveColor", Color.red * 1000f );
            steam.SetActive ( false );
        }

        yield return null;
    }
}

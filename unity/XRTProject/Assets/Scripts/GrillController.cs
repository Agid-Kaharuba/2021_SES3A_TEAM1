using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class GrillController : MonoBehaviour {

    Animator anim;
    Renderer rend;

    void Start() {
        anim = gameObject.GetComponent<Animator> ();
        rend = gameObject.transform.Find("grill").GetComponent<Renderer> ();
    }

    void Update() {
        
    }

    public void ToggleGrill() {
        if ( anim.GetBool( "grillOn" ) ) {
            anim.SetBool ( "grillOn", false );
        } else {
            anim.SetBool ( "grillOn", true );
        }

        StartCoroutine ( ToggleLight() );
    }

    IEnumerator ToggleLight () {
        yield return new WaitForSeconds ( 0.5f );

        if ( anim.GetBool ( "grillOn" ) ) {
            rend.material.SetColor ( "_EmissiveColor", Color.green * 1000f );
            //rend.material.SetFloat ( "_EmissiveIntensity", 100f );
        } else {
            rend.material.SetColor ( "_EmissiveColor", Color.red * 1000f );
            //rend.material.SetFloat ( "_EmissiveIntensity", 100f );
        }

        yield return null;
    }
}

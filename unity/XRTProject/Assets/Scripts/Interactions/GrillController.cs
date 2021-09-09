using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.VFX;

public class GrillController : MonoBehaviour {

    Renderer rend;
    VisualEffect steamEffect;

    void Start() {
        rend = GameObject.Find("grill").GetComponent<Renderer> ();
        steamEffect = GameObject.Find ( "Steam" ).GetComponent<VisualEffect> ();
    }

    void Update() {
        
    }

    IEnumerator PowerOn () {
        yield return new WaitForSeconds ( 0.5f );

        rend.material.SetColor ( "_EmissiveColor", Color.green * 1000f );
        steamEffect.enabled = true;

        yield return null;
    }

    IEnumerator PowerOff () {
        yield return new WaitForSeconds ( 0.5f );

        rend.material.SetColor ( "_EmissiveColor", Color.red * 1000f );
        steamEffect.enabled = false;

        yield return null;
    }

    public void SwitchOn () {
        StartCoroutine ( PowerOn() );
    }

    public void SwitchOff () {
        StartCoroutine ( PowerOff() );
    }
}

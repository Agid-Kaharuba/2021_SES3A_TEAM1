using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.Events;
using UnityEngine.VFX;

public class GrillController : MonoBehaviour
{
    private Renderer rend;
    private VisualEffect steamEffect;
    private bool poweredOn = false;
    private AudioSource click;

    public UnityEvent GrillPoweredOn;
    public UnityEvent GrillPoweredOff;

    private void Start()
    {
        rend = GameObject.Find("grill").GetComponent<Renderer>();
        steamEffect = GameObject.Find("Steam").GetComponent<VisualEffect>();
        click = gameObject.GetComponent<AudioSource>();
    }

    private IEnumerator ToggleGrill()
    {
        click.Play();

        yield return new WaitForSeconds(0.5f);

        if (poweredOn)
        {
            rend.material.SetColor("_EmissiveColor", Color.red * 1000f);
            steamEffect.enabled = false;
            poweredOn = false;
            GrillPoweredOff.Invoke();
        }
        else
        {
            rend.material.SetColor("_EmissiveColor", Color.green * 1000f);
            steamEffect.enabled = true;
            poweredOn = true;
            GrillPoweredOn.Invoke();
        }

        yield return null;
    }

    public void TogglePower()
    {
        StartCoroutine(ToggleGrill());
    }
}
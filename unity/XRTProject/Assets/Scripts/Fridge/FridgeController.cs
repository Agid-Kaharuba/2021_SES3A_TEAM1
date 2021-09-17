using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.VFX;


public class FridgeController : MonoBehaviour
{
    private List<GameObject> ItemsToAdd = new List<GameObject>();
    private List<Transform> ItemsPosition = new List<Transform>();
    private bool changed;
    private AudioSource click;

    void Start()
    {
        click = gameObject.GetComponent<AudioSource>();
        changed = false;
    }

    void Changed(GameObject item, Transform position)
    {
        ItemsToAdd.Add(item);
        ItemsPosition.Add(position);
        changed = true;
    }

    IEnumerator resetFridge()
    {
        click.Play();

        if (changed)
        {
                for(int i =0; i < ItemsToAdd.Count; i++)
                {
                    var FridgeItems = Instantiate(ItemsToAdd[i], ItemsPosition[i]);
                    FridgeItems.transform.parent = GameObject.Find(ItemsToAdd[i].transform.name).transform;
                }
                changed = false;
        }
        

        yield return null;
    }

    public void FridgeButton()
    {
        StartCoroutine(resetFridge());
    }
}

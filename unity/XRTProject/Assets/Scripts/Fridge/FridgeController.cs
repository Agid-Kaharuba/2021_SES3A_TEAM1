using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.VFX;


public class FridgeController : MonoBehaviour
{
    GameObject items;
    List<int> childC;
    public GameObject pref;
    public bool changed;
    Vector3 P;
    int reset = 0;
    private AudioSource click;

    void Start()
    {
        click = gameObject.GetComponent<AudioSource>();
        childC = new List<int>();
        items = GameObject.Find("ItemsInTheFridge");
        changed = false;
        P = GameObject.Find("ItemsInTheFridge").transform.position;
        for (int x = 0; x < items.transform.childCount; x++)
        {
            childC.Add(items.transform.GetChild(x).childCount);
        }
    }

    void Update()
    {
        if (changed == false && reset==0)
        {
            for (int x = 0; x < items.transform.childCount; x++)
            {
                if (childC[x] != items.transform.GetChild(x).childCount)
                {
                    changed = true;
                }
            }
        }
        if(changed == false && reset > 0)
        {
            items = GameObject.Find("ItemsInTheFridge(Clone)");
            for (int x = 0; x < items.transform.childCount; x++)
            {
                if (childC[x] != items.transform.GetChild(x).childCount)
                {
                    changed = true;
                }
            }
        }

    }

    IEnumerator resetFridge()
    {
        click.Play();

        if (changed)
        {
            if (reset == 0)
            {
                Destroy(GameObject.Find("ItemsInTheFridge"));
                var FridgeItems = Instantiate(pref, P, Quaternion.identity);
                FridgeItems.transform.parent = GameObject.Find("Fridge").transform;
                reset++;
                changed = false;
            }
            else
            {
                Destroy(GameObject.Find("ItemsInTheFridge(Clone)"));
                var FridgeItems = Instantiate(pref, P, Quaternion.identity);
                FridgeItems.transform.parent = GameObject.Find("Fridge").transform;
                reset++;
                changed = false;
            }
            
        }
        

        yield return null;
    }

    public void FridgeButton()
    {
        StartCoroutine(resetFridge());
    }
}

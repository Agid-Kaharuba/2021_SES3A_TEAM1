using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.VFX;


public class FridgeController : MonoBehaviour
{
    private List<GameObject> ItemsToAdd = new List<GameObject>();
    private List<Transform> ItemsPosition = new List<Transform>();
    private int changed;
    private AudioSource click;

    void Start()
    {
        click = gameObject.GetComponent<AudioSource>();
        changed = 0;
    }

    void Update()
    {
        
    }
    public void AddItemsToReset(GameObject item, Transform position)
    {
        ItemsToAdd.Add(item);
        ItemsPosition.Add(position);
        changed++;
    }
    public void RemoveItemsToReset(GameObject item, Transform position)
    {
        ItemsToAdd.Remove(item);
        ItemsPosition.Remove(position);
        changed--;
    }

    IEnumerator resetFridge()
    {
        click.Play();

        if (changed>0)
        {
                for(int i =0; i < ItemsToAdd.Count; i++)
                {
                    var FridgeItems = Instantiate(ItemsToAdd[i], ItemsPosition[i]);
                    FridgeItems.transform.parent = GameObject.Find(ItemsToAdd[i].transform.name).transform;
                }
                changed = 0;
        }
        

        yield return null;
    }

    public void FridgeButton()
    {
        StartCoroutine(resetFridge());
    }
}

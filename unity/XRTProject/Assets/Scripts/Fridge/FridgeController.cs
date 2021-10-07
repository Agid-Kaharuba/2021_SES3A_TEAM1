using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.VFX;


public class FridgeController : MonoBehaviour
{
    private List<GameObject> Items = new List<GameObject>();
    private List<GameObject> ItemsToAdd = new List<GameObject>();
    private List<Transform> ItemsPosition = new List<Transform>();
    private List<Transform> ItemsPositionToReset = new List<Transform>();
    private int changed;
    private AudioSource click;
    public GameObject pref;
    private void Awake()
    {
        Instantiate(pref, pref.transform.position, pref.transform.rotation ,GameObject.Find("Fridge").transform);


    }

    void Start()
    {
        click = gameObject.GetComponent<AudioSource>();
        changed = 0;
    }

    void Update()
    {
        
    }
    public void AddItems(GameObject item, Transform position)
    {
        Items.Add(item);
        ItemsPosition.Add(position);
    }

    public void AddItemsToReset(GameObject item)
    {
        ItemsToAdd.Add(item);
        int index = Items.FindIndex(a=>a.name == item.name);
        Debug.Log(index);
        
        //ItemsPositionToReset.Add()
        //changed++;
    }
    public void RemoveItemsToReset(GameObject item)
    {
        ItemsToAdd.Remove(item);
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

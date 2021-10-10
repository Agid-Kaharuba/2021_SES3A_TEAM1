using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.VFX;


public class FridgeController : MonoBehaviour
{
    private List<GameObject> Items = new List<GameObject>();
    private List<Vector3> InitialItemsPosition = new List<Vector3>();
    private List<Quaternion> InitialItemsRotation = new List<Quaternion>();

    private List<GameObject> ItemsToAdd = new List<GameObject>();
    private List<Vector3> ItemsPositionToReset = new List<Vector3>();
    private List<Quaternion> ItemsRotationToReset = new List<Quaternion>();

    private bool changed;    

    void Start()
    {
        changed = false;
    }

    void Update()
    {
        /**
        if (Input.GetKeyDown(KeyCode.Space)){
            StartCoroutine(resetFridge());
        }
        **/
    }
    public void AddItems(GameObject item, Vector3 position, Quaternion rotation)
    {
        Items.Add(item);
        InitialItemsPosition.Add(position);
        InitialItemsRotation.Add(rotation);
    }

    public void AddItemsToReset(GameObject item)
    {
        int index = Items.FindIndex(a=>a.name == item.name);
        ItemsToAdd.Add(Items[index]);
        ItemsPositionToReset.Add(InitialItemsPosition[index]);
        ItemsRotationToReset.Add(InitialItemsRotation[index]);
        changed = true;
        Debug.Log(index+";"+ item + ";" + changed);
    }
    public void RemoveItemsToReset(GameObject item)
    {
        ItemsToAdd.Remove(item);
    }

    IEnumerator resetFridge()
    {
        FindObjectOfType<AudioManager>().Play("Button Press");

        while (changed == true)
        {
            for (int i = 0; i < ItemsToAdd.Count; i++)
            {
                GameObject temp = Instantiate(ItemsToAdd[i], ItemsPositionToReset[i], ItemsRotationToReset[i],
                    GameObject.Find(ItemsToAdd[i].transform.name).transform.parent);
                Items.Add(temp);
                InitialItemsPosition.Add(temp.transform.position);
                InitialItemsRotation.Add(temp.transform.rotation);

            }
            changed = false;
            ItemsToAdd = new List<GameObject>();
            ItemsPositionToReset = new List<Vector3>();
            ItemsRotationToReset = new List<Quaternion>();
        }
        
        

        yield return null;
    }

    public void FridgeButton()
    {
        StartCoroutine(resetFridge());
    }
}

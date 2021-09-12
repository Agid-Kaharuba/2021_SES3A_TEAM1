using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class FridgeManager : MonoBehaviour
{
    GameObject items;
    List<int> childC;
    public GameObject pref;
    bool changed, Ldoor, Rdoor;
    Vector3 P;
    public int reset = 0;

    void Start()
    {
        childC = new List<int>();
        items = GameObject.Find("ItemsInTheFridge");
        changed = false;
        P = GameObject.Find("ItemsInTheFridge").transform.position;
        for (int x =0; x< items.transform.childCount; x++)
        {
            childC.Add(items.transform.GetChild(x).childCount);
        }


    }

    void Update()
    {
        if (changed == false)
        {
            for (int x = 0; x < items.transform.childCount; x++)
            {
                if (childC[x] != items.transform.GetChild(x).childCount)
                {
                    changed = true;
                    Destroy(GameObject.Find("ItemsInTheFridge"));
                    var FridgeItems = Instantiate(pref, P, Quaternion.identity);
                    FridgeItems.transform.parent = gameObject.transform;
                    reset++;
                }
            }
        }
        
        //checkDoors();
    }

    public void door1Closed()
    {
        Ldoor = true;

    }
    public void door2Closed()
    {
        Rdoor = true;
    }

    void checkDoors()
    {
        if (changed == true && Ldoor == true && Rdoor == true)
        {
            Destroy(GameObject.Find("ItemsInTheFridge"));
            var FridgeItems = Instantiate(items, P, Quaternion.identity);
            FridgeItems.transform.parent = gameObject.transform;
            reset++;
            changed = false;
        }
    }


}

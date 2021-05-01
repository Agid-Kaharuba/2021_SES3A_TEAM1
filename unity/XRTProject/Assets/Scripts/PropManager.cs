using System;
using System.Collections.Generic;
using UnityEngine;


public class PropManager : MonoBehaviour
{
    [SerializeField] private List<PropData> props = new List<PropData>();

    private readonly Dictionary<string, PropData> propDictionary = new Dictionary<string, PropData>();

    public static PropManager Instance { get; set; }

    private void Awake()
    {
        if (Instance != null)
        {
            Destroy(this);
            return;
        }

        Instance = this;

        foreach (PropData propData in props)
        {
            propDictionary[propData.PropId] = propData;
        }
    }

    public bool HasProp(string id)
    {
        return propDictionary.ContainsKey(id);
    }

    public PropData GetProp(string id)
    {
        if (HasProp(id))
        {
            return propDictionary[id];
        }

        return null;
    }
}
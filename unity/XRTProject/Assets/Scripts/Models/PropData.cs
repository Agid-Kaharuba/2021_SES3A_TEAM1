using System;
using UnityEngine;
#if UNITY_EDITOR
using System.IO;
using UnityEditor;
#endif


[CreateAssetMenu(menuName = "ScriptableObjects/PropData", fileName = "NewProp")]
public class PropData : ScriptableObject
{
    [SerializeField] private string propId;
    [SerializeField] private GameObject associatedPrefab;

    public string PropId => PropId;

    /// Change the prefab object in which this prop is instantiated from
    public void AssignPrefab(GameObject targetObject)
    {
        associatedPrefab = targetObject;
    }

    /// Creates a new Prop object to be used in the world
    public GameObject InstantiateProp(Vector3 position, Quaternion rotation)
    {
        return Instantiate(associatedPrefab, position, rotation);
    }
}
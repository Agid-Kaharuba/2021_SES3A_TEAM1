using UnityEditor;
using UnityEngine;


[CustomEditor(typeof(Cookable))]
public class CookableEditor : UnityEditor.Editor
{
    public override void OnInspectorGUI()
    {
        base.OnInspectorGUI();
        EditorGUILayout.Space();

        if (serializedObject.targetObject is Cookable cookable)
        {
            GUILayout.Label($"Cook Time: {cookable.CookTime}");
            GUILayout.Label($"Cook Percentage: {cookable.CookPercentage}");
        }
    }
}
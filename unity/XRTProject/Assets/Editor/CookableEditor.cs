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
            GUILayout.Label($"Average Cook Time: {cookable.CookTime}");
            GUILayout.Label($"Average Cook Percentage: {cookable.CookPercentage}");
            EditorGUILayout.Space();
            GUILayout.Label($"Top Cook Time: {cookable.TopSide.CookTime}");
            GUILayout.Label($"Top Cook Percentage: {cookable.TopSide.CookPercentage}");
            EditorGUILayout.Space();
            GUILayout.Label($"Bottom Cook Time: {cookable.BottomSide.CookTime}");
            GUILayout.Label($"Bottom Cook Percentage: {cookable.BottomSide.CookPercentage}");
        }
    }
}
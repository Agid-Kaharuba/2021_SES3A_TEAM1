using System;
using UnityEngine;

[ExecuteInEditMode]
public class UIBoxColliderAutoScaler : MonoBehaviour
{
    [SerializeField] private BoxCollider collider;
    [SerializeField] private float depth = 0.06f;
    [SerializeField] private float width = 0f;
    [SerializeField] private float height = 0f;

    private RectTransform rectTransform;

    private void Update()
    {
        AutoScale();
    }

    public void AutoScale()
    {
        if (rectTransform == null)
            rectTransform = GetComponent<RectTransform>();
            
        Vector3 colliderSize = collider.size;
        colliderSize.x = (rectTransform.rect.width / collider.transform.localScale.x) + width;
        colliderSize.y = (rectTransform.rect.height / collider.transform.localScale.y) + height;
        colliderSize.z = depth;
        collider.size = colliderSize;
    }
}
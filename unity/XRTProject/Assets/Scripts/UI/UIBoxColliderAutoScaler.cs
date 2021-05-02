using System;
using UnityEngine;

[ExecuteInEditMode]
public class UIBoxColliderAutoScaler : MonoBehaviour
{
    [SerializeField] private BoxCollider collider;
    [SerializeField] private float depth = 0.06f;

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
        colliderSize.x = rectTransform.rect.width / collider.transform.localScale.x;
        colliderSize.y = rectTransform.rect.height / collider.transform.localScale.y;
        colliderSize.z = depth;
        collider.size = colliderSize;
    }
}
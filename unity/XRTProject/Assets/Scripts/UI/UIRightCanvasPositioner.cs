using System;
using UnityEngine;


[ExecuteAlways]
public class UIRightCanvasPositioner : MonoBehaviour
{
    [SerializeField] private Canvas targetCanvas;
    [SerializeField] private float xOffset = 3f;

    private void Start()
    {
        AutoPosition();
    }

    private void Update()
    {
        if (!Application.IsPlaying(gameObject))
        {
            AutoPosition();
        }
    }

    public void AutoPosition()
    {
        if (enabled && transform.parent != null)
        {
            Canvas rootCanvas = transform.parent.GetComponentInParent<Canvas>();
            Canvas canvas = targetCanvas != null ? targetCanvas : rootCanvas;

            if (canvas != null)
            {
                RectTransform canvasRectTransform = canvas.GetComponent<RectTransform>();

                Vector3 position = transform.localPosition;
                position.x = canvas.transform.localPosition.x + (canvasRectTransform.rect.width / 2f) + xOffset;
                transform.localPosition = position;
            }
        }
    }
}
using System;
using System.Text;
using TMPro;
using UnityEngine;
using UnityEngine.Events;

[Serializable]
public class OnTaskSelectedEvent : UnityEvent<Task> {}

public class UITaskSelector : MonoBehaviour
{
    [SerializeField] private RectTransform taskList;
    [SerializeField] private UIReorderableElement itemPrefab;
    [SerializeField] private UIReorderableElement sampleItem;
    [SerializeField] private bool shouldCloseOnSelect = true;
    [SerializeField] public OnTaskSelectedEvent OnTaskSelected;

    private float itemFontSize;
    private Vector2 itemSizeDelta;

    private void Awake()
    {
        itemFontSize = sampleItem.Text.fontSize;
        RectTransform sampleRectTransform = sampleItem.GetComponent<RectTransform>();
        itemSizeDelta = sampleRectTransform.sizeDelta;
    }

    private void OnEnable()
    {
        UpdateTaskList();
    }

    private void UpdateTaskList()
    {
        ClearTaskList();

        foreach (Task task in TrainingManager.Instance.Tasks)
        {
            UIReorderableElement item = Instantiate(itemPrefab, taskList);
            RectTransform rectTransform = item.GetComponent<RectTransform>();
            item.canDrag = false;
            item.Text.text = task.Name;
            item.Text.fontSize = sampleItem.Text.fontSize;
            rectTransform.sizeDelta = itemSizeDelta;
            item.GetComponent<UIBoxColliderAutoScaler>()?.AutoScale();

            item.OnClick.AddListener(() =>
            {
                OnTaskClicked(item, task);
            });
        }
    }

    private void OnTaskClicked(UIReorderableElement item, Task task)
    {
        OnTaskSelected?.Invoke(task);

        if (shouldCloseOnSelect)
        {
            gameObject.SetActive(false);
        }
    }

    private void ClearTaskList()
    {
        for (int i = 0; i < taskList.transform.childCount; i++)
        {
            Destroy(taskList.GetChild(i).gameObject);
        }
    }

    public void OnCancel()
    {
        gameObject.SetActive(false);
    }
}
using System;
using System.Collections.Generic;
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
    private bool isReorderable;

    private void Awake()
    {
        itemFontSize = sampleItem.Text.fontSize;
        RectTransform sampleRectTransform = sampleItem.GetComponent<RectTransform>();
        itemSizeDelta = sampleRectTransform.sizeDelta;
        isReorderable = sampleItem.canDrag;
    }

    private void OnEnable()
    {
        UpdateTaskList();
        TrainingManager.Instance.OnCurrentTaskChanged.AddListener(UpdateTaskList);
    }

    private void OnDisable()
    {
        TrainingManager.Instance.OnCurrentTaskChanged.RemoveListener(UpdateTaskList);
    }

    private void UpdateTaskList()
    {
        ClearTaskList();

        foreach (Task task in TrainingManager.Instance.Tasks)
        {
            UIReorderableElement item = Instantiate(itemPrefab, taskList);
            RectTransform rectTransform = item.GetComponent<RectTransform>();
            item.canDrag = isReorderable;
            item.Text.text = task.Name;
            item.Text.fontSize = sampleItem.Text.fontSize;
            item.SetHighlighted(TrainingManager.Instance.CurrentTask == task);
            rectTransform.sizeDelta = itemSizeDelta;
            item.GetComponent<UIBoxColliderAutoScaler>()?.AutoScale();

            item.OnClick.AddListener(() =>
            {
                OnTaskClicked(item, task);
            });
            
            item.OnReorderEvent.AddListener((fromIndex, toIndex, otherItem) =>
            {
                ReorderTasks(item, fromIndex, otherItem, toIndex);
            });
        }
    }

    private void ReorderTasks(UIReorderableElement fromItem, int fromIndex, UIReorderableElement toItem, int toIndex)
    {
        TrainingManager.Instance.ReorderTask(fromIndex, toIndex);
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
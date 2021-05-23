using System;
using System.Collections.Generic;
using System.Text;
using TMPro;
using UnityEngine;
using UnityEngine.Events;
using Valve.VR.InteractionSystem;
using VRKeys;

[Serializable]
public class OnTaskSelectedEvent : UnityEvent<Task> {}

public class UITaskSelector : MonoBehaviour
{
    [SerializeField] private RectTransform taskList;
    [SerializeField] private UIReorderableElement itemPrefab;
    [SerializeField] private UIReorderableElement sampleItem;
    [SerializeField] private bool shouldCloseOnSelect = true;
    [SerializeField] private bool canDrag = false;
    [SerializeField]
    public TaskTypeMask taskFilter = TaskTypeMask.None;
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
        TrainingManager.Instance.OnTrainingModuleChanged.AddListener(UpdateTaskList);
        TrainingManager.Instance.OnCurrentTaskChanged.AddListener(UpdateTaskList);
    }

    private void OnDisable()
    {
        TrainingManager.Instance.OnTrainingModuleChanged.RemoveListener(UpdateTaskList);
        TrainingManager.Instance.OnCurrentTaskChanged.RemoveListener(UpdateTaskList);
    }

    private void UpdateTaskList()
    {
        if (!TrainingManager.Instance.IsTrainingModuleReady) return;
        
        ClearTaskList();

        foreach (Task task in TrainingManager.Instance.Tasks)
        {
            bool isValidTask = (!taskFilter.HasFlag(TaskTypeMask.Recipe) || task.TaskType == TaskType.Recipe) &&
                               (!taskFilter.HasFlag(TaskTypeMask.Testing) || task.TaskType == TaskType.Testing) &&
                               (!taskFilter.HasFlag(TaskTypeMask.Performance) || task.TaskType == TaskType.Performance);

            if (isValidTask)
            {
                UIReorderableElement item = Instantiate(itemPrefab, taskList);
                RectTransform rectTransform = item.GetComponent<RectTransform>();
                item.canDrag = canDrag;
                item.Text.text = task.Name;
                item.Text.fontSize = sampleItem.Text.fontSize;
                item.SetHighlighted(TrainingManager.Instance.CurrentTask == task);
                rectTransform.sizeDelta = itemSizeDelta;
                item.GetComponent<UIBoxColliderAutoScaler>()?.AutoScale();
                UIRemoveButton removeButton = item.GetComponentInChildren<UIRemoveButton>();
                KeyboardResponder keyboardResponder = item.GetComponentInChildren<KeyboardResponder>();

                item.OnClick.AddListener(() =>
                {
                    OnTaskClicked(item, task);
                });
            
                item.OnReorderEvent.AddListener((fromIndex, toIndex, otherItem) =>
                {
                    ReorderTasks(item, fromIndex, otherItem, toIndex);
                });

                if (keyboardResponder != null)
                {
                    keyboardResponder.OnTextSubmit.AddListener((text) =>
                    {
                        task.Name = text;
                        TrainingManager.Instance.UpdateTask(task);
                    });
                }

                if (removeButton != null)
                {
                    removeButton.OnRemove.AddListener(() =>
                    {
                        TrainingManager.Instance.RemoveTask(task);
                    });
                }
            }
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

    public void SetCanDrag(bool canDrag)
    {
        this.canDrag = canDrag;
        UpdateTaskList();
    }

    public void OnCancel()
    {
        gameObject.SetActive(false);
    }
}
using System;
using System.Collections.Generic;
using TMPro;
using UnityEngine;
using UnityEngine.UI;
using Valve.VR.InteractionSystem;


public class UICreateTask : MonoBehaviour
{
    // private Button selectedButton;
    //
    // public Button SelectedButton => selectedButton;
    // public int SelectedIndex;

    // private void SetupChoose()
    // {
    //     var uiElements = GetComponentsInChildren<UIElement>();
    //
    //     foreach (UIElement uiElement in uiElements)
    //     {
    //         Button button = uiElement.GetComponent<Button>();
    //         
    //         uiElement.onHandClick.AddListener(hand =>
    //         {
    //             if (selectedButton)
    //                 selectedButton.interactable = true;
    //
    //             button.interactable = false;
    //             selectedButton = button;
    //         });
    //     }
    // }

    [SerializeField] private UIElement buttonPrefab;
    [SerializeField] private Transform buttonsParent;
    [SerializeField] private TMP_Text nameText;
    
    private TaskType taskType;
    private string taskName;
    private Button lastButton;
    private Dictionary<TaskType, UIElement> buttons = new Dictionary<TaskType, UIElement>();

    private void Awake()
    {
        ClearButtons();
        CreateButton(TaskType.Recipe);
        //CreateButton(TaskType.Performance);
        CreateButton(TaskType.Testing);
    }

    private void OnEnable()
    {
        // Set default values here
        SetTaskType(TaskType.Recipe);
        SetTaskName("New Task");
    }

    private void ClearButtons()
    {
        for (int i = 0; i < buttonsParent.childCount; i++)
        {
            Destroy(buttonsParent.GetChild(i).gameObject);
        }
    }

    private void CreateButton(TaskType taskType)
    {
        UIElement uiElement = Instantiate(buttonPrefab, buttonsParent);
        TMP_Text text = uiElement.GetComponentInChildren<TMP_Text>();
        text.text = taskType.ToString();
        text.fontSize = 15f;
        uiElement.onHandClick.AddListener((hand) => SetTaskType(taskType));
        buttons[taskType] = uiElement;
    }

    public void SetTaskName(string name)
    {
        taskName = name;

        if (nameText)
            nameText.text = name;
    }

    public void UpdateTaskNameFromTextField()
    {
        taskName = nameText.text;
    }

    public void SetTaskType(TaskType taskType)
    {
        this.taskType = taskType;

        if (lastButton != null)
        {
            lastButton.interactable = true;
        }

        if (buttons.ContainsKey(taskType))
        { 
           Button button = buttons[taskType].GetComponent<Button>();
           button.interactable = false;
           lastButton = button;
        }
    }

    public void CreateNewTask()
    {
        TrainingManager.Instance.CreateNewTask(taskName, taskType);
        gameObject.SetActive(false);
    }
}
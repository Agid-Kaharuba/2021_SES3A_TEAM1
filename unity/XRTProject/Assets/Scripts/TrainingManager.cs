using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.Events;

public class TrainingManager : MonoBehaviour
{
    [SerializeField] public UnityEvent OnCurrentTaskChanged;
    
    private TrainingModule trainingModule;
    
    public static TrainingManager Instance { get; private set; }

    public Task CurrentTask { get; private set; }

    public bool HasCurrentTask => CurrentTask != null;
    
    public int CurrentTaskIndex => HasCurrentTask ? trainingModule.tasks.BinarySearch(CurrentTask) : -1;

    public IList<Task> Tasks => trainingModule.tasks;
    
    public TrainingModule TrainingModule => trainingModule;

    private void Awake()
    {
        if (Instance != null)
        {
            Destroy(this);
            return;
        }
        
        // TODO remove Sample tasks and query backend
        trainingModule = new TrainingModule("Make a Simple burger");
        
        Task whooperTask = new Task("Learn to make a Whooper", TaskType.Recipe);
        whooperTask.Recipe = new Recipe("Whooper", "top_bun", "lettuce", "cheese", "patty", "bottom_bun");
        trainingModule.tasks.Add(whooperTask);
        
        Task cheeseBurgerTask = new Task("Learn to make a Cheeseburger", TaskType.Recipe);
        cheeseBurgerTask.Recipe = new Recipe("Cheeseburger", "top_bun", "cheese", "patty", "bottom_bun");
        trainingModule.tasks.Add(cheeseBurgerTask);
        
        trainingModule.tasks.Add(new Task("Remembering to make a Whooper", TaskType.Testing));
        trainingModule.tasks.Add(new Task("Serve 5 customers", TaskType.Performance));
        CurrentTask = whooperTask;

        Instance = this;
    }

    public void ReorderTask(int fromIndex, int toIndex)
    {
        Task tempTask = trainingModule.tasks[fromIndex];
        trainingModule.tasks[fromIndex] = trainingModule.tasks[toIndex];
        trainingModule.tasks[toIndex] = tempTask;
        
        // TODO Update changes to backend here
    }

    public void SwitchTask(Task task)
    {
        CurrentTask = task;
        OnCurrentTaskChanged?.Invoke();
    }

    public void SwitchTask(int index)
    {
        if (index >= 0 && index < Tasks.Count)
        {
            SwitchTask(Tasks[index]);
        }
        else
        {
            SwitchTask(null);
        }
    }

    public void SwitchNextTask()
    {
        SwitchTask(CurrentTaskIndex + 1);
    }

    public void SwitchPreviousTask()
    {
        SwitchTask(CurrentTaskIndex - 1);
    }
}

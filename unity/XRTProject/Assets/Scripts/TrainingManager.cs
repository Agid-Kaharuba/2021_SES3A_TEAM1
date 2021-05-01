using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class TrainingManager : MonoBehaviour
{
    private List<Task> tasks = new List<Task>();
    private TrainingModule trainingModule;
    
    public static TrainingManager Instance { get; private set; }

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
        whooperTask.Recipe = new Recipe("top_bun", "lettuce", "cheese", "patty", "bottom_bun");
        trainingModule.tasks.Add(whooperTask);
        
        Task cheeseBurgerTask = new Task("Learn to make a Cheeseburger", TaskType.Recipe);
        cheeseBurgerTask.Recipe = new Recipe("top_bun", "cheese", "patty", "bottom_bun");
        trainingModule.tasks.Add(cheeseBurgerTask);
        
        trainingModule.tasks.Add(new Task("Remembering to make a Whooper", TaskType.Testing));
        trainingModule.tasks.Add(new Task("Serve 5 customers", TaskType.Performance));

        Instance = this;
    }

    public void ReorderTask(int fromIndex, int toIndex)
    {
        Task tempTask = tasks[fromIndex];
        tasks[fromIndex] = tasks[toIndex];
        tasks[toIndex] = tempTask;
    }
}

using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class TrainingManager : MonoBehaviour
{
    private List<Task> tasks = new List<Task>();
    
    public static TrainingManager Instance { get; private set; }

    public IList<Task> Tasks => tasks.AsReadOnly();

    private void Awake()
    {
        if (Instance != null)
        {
            Destroy(this);
            return;
        }
        
        // TODO remove Sample tasks and query backend
        tasks.Add(new Task("Learn to make a Whooper", TaskType.Recipe));
        tasks.Add(new Task("Learn to make a Cheeseburger", TaskType.Recipe));
        tasks.Add(new Task("Remembering to make a Whooper", TaskType.Testing));
        tasks.Add(new Task("Serve 5 customers", TaskType.Performance));

        Instance = this;
    }
    
    private void Update()
    {
        
    }

    public void ReorderTask(int fromIndex, int toIndex)
    {
        Task tempTask = tasks[fromIndex];
        tasks[fromIndex] = tasks[toIndex];
        tasks[toIndex] = tempTask;
    }
}

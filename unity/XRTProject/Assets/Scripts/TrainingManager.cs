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
        
        // TODO remove Sample tasks
        tasks.Add(new Task("Learn to make a Whooper", TaskType.Recipe));
        tasks.Add(new Task("Remembering to make a Whooper", TaskType.Testing));

        Instance = this;
    }
    
    private void Update()
    {
        
    }
}

using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.Events;
using Valve.Newtonsoft.Json;

public class TrainingManager : MonoBehaviour
{
    [SerializeField] public UnityEvent OnCurrentTaskChanged;
    [SerializeField] public UnityEvent OnTrainingModuleChanged;
    
    private TrainingModule trainingModule;
    
    public static TrainingManager Instance { get; private set; }

    public Task CurrentTask { get; private set; }
    
    public User CurrentUser { get; private set; }

    public bool HasCurrentTask => CurrentTask != null;
    
    public int CurrentTaskIndex => HasCurrentTask ? trainingModule.Tasks.BinarySearch(CurrentTask) : -1;

    public IList<Task> Tasks => trainingModule.Tasks;

    public TrainingModule TrainingModule
    {
        get
        {
            return trainingModule;
        }
        private set
        {
            trainingModule = value;
            OnTrainingModuleChanged?.Invoke();
        }
    }

    public bool IsTrainingModuleReady => TrainingModule != null;

    public ApiService apiService;

    private void Awake()
    {
        if (Instance != null)
        {
            Destroy(this);
            return;
        }

        apiService = new ApiService(LaunchArgsService.GetToken());
        string userId = "Enter a userId from your database";

        // Use apiService.GetCurrentUser once the token is provided.
        StartCoroutine(apiService.GetUser(userId, (response) =>
        {
            if (response is BackendErrorResponse errorReponse)
            {
                Debug.LogError($"Could not get training module got {errorReponse.Message}");
            }
            else if (response is User user)
            {
                CurrentUser = user;
                Debug.Log("retrieved user");
            }
        }));

        // TODO remove Sample tasks and query backend


        //trainingModule = new TrainingModule("Make a Simple burger");

        //Task whooperTask = new Task("Learn to make a Whooper", TaskType.Recipe);
        //whooperTask.Recipe = new Recipe("Whooper", "top_bun", "lettuce", "cheese", "patty", "bottom_bun");
        //trainingModule.Tasks.Add(whooperTask);

        //Task cheeseBurgerTask = new Task("Learn to make a Cheeseburger", TaskType.Recipe);
        //cheeseBurgerTask.Recipe = new Recipe("Cheeseburger", "top_bun", "cheese", "patty", "bottom_bun");
        //trainingModule.Tasks.Add(cheeseBurgerTask);

        //trainingModule.Tasks.Add(new Task("Remembering to make a Whooper", TaskType.Testing));
        //trainingModule.Tasks.Add(new Task("Serve 5 customers", TaskType.Performance));
        //CurrentTask = whooperTask;

        Instance = this;
    }

    private void Start()
    {
        // TODO fetch this from the command line when launching from web to unity
        string trainingModuleId = "608eae5ab7dd3233a46916f7";
        
        StartCoroutine(apiService.GetTrainingModule(trainingModuleId, (response) =>
        {
            if (response is BackendErrorResponse errorReponse)
            {
                Debug.LogError($"Could not get training module got {errorReponse.Message}");
            }
            else if (response is TrainingModule module)
            {
                TrainingModule = module;
                SwitchTask(0);
            }
        }));
    }

    public void ReorderTask(int fromIndex, int toIndex)
    {
        Task tempTask = trainingModule.Tasks[fromIndex];
        trainingModule.Tasks[fromIndex] = trainingModule.Tasks[toIndex];
        trainingModule.Tasks[toIndex] = tempTask;
        
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

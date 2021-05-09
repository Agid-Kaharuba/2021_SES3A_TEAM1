using System;
using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.Events;
using Valve.Newtonsoft.Json;
using System.Linq;

public class TrainingManager : MonoBehaviour
{
    [Tooltip("This is useful for debugging only")]
    [SerializeField] public bool forceCanCustomize;
    [SerializeField] public UnityEvent OnCurrentTaskChanged;
    [SerializeField] public UnityEvent OnTrainingModuleChanged;
    [SerializeField] public UnityEvent OnUserReady;
    [SerializeField] public UnityEvent OnCustomizationSettingsChanged;
    
    private TrainingModule trainingModule;
    private ApiService apiService;
    
    public static TrainingManager Instance { get; private set; }

    public bool CanCustomize => forceCanCustomize || (CurrentUser != null && CurrentUser.IsSupervisor);

    public Task CurrentTask { get; private set; }
    
    public User CurrentUser { get; private set; }

    public bool HasCurrentTask => CurrentTask != null;
    
    public int CurrentTaskIndex => HasCurrentTask ? trainingModule.Tasks.FindIndex(t => t == CurrentTask) : -1;

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

    private void Awake()
    {
        if (Instance != null)
        {
            Destroy(this);
            return;
        }
        
        Instance = this;

        string token = "";
        
        try
        {
            token = LaunchArgsService.GetToken();
        }
        catch (Exception e)
        {
            Debug.Log($"Could not get token : {e}");
        }
        
        apiService = new ApiService(token);
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
                OnUserReady?.Invoke();
                Debug.Log("Retrieved user data!");
            }
            
            OnCustomizationSettingsChanged?.Invoke();
        }));

        // trainingModule = new TrainingModule("Make a Simple burger", "courseId");
        //
        // Task whooperTask = new Task("Learn to make a Whooper", TaskType.Recipe);
        // whooperTask.Recipe = new Recipe("Whooper", "top_bun", "lettuce", "cheese", "patty", "bottom_bun");
        // trainingModule.Tasks.Add(whooperTask);
        //
        // Task cheeseBurgerTask = new Task("Learn to make a Cheeseburger", TaskType.Recipe);
        // cheeseBurgerTask.Recipe = new Recipe("Cheeseburger", "top_bun", "cheese", "patty", "bottom_bun");
        // trainingModule.Tasks.Add(cheeseBurgerTask);
        //
        // trainingModule.Tasks.Add(new Task("Remembering to make a Whooper", TaskType.Testing));
        // trainingModule.Tasks.Add(new Task("Serve 5 customers", TaskType.Performance));
        // CurrentTask = whooperTask;
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
        
        if (forceCanCustomize)
            OnCustomizationSettingsChanged?.Invoke();
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

    public void UpdateTaskWithNewRecipe(Task task, Recipe recipe)
    {
        if (task.Recipe == null) return;
        
        task.Recipe.SetIngredients(recipe.Ingredients);

        StartCoroutine(apiService.UpdateRecipe(task.Recipe, (obj) =>
        {
            if (obj is BackendErrorResponse error)
            {
                Debug.LogError($"Error updating recipe: {error.Message}");
            }
        }));
    }

    public void SubmitTask(Recipe recipe)
    {
        // Progress progress = new Progress(trainingModule.Id, CurrentTask.Id, "userId", true, 100);
        Progress progress = new Progress("sdfsdf", "sdf", "userId", true, 100);
        progress.Data = recipe;

        StartCoroutine(apiService.SubmitTaskProgress(progress, (obj) => { 
            if (obj is BackendErrorResponse error)
            {
                Debug.LogError($"Error posting progress: {error.Message}");
            }
        }));
    }
}

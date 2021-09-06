using System;
using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.Events;
using Valve.Newtonsoft.Json;
using System.Linq;
using Training;

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

        string token;
        
        try
        {
            token = LaunchArgsService.GetToken();
        }
        catch (Exception e)
        {
            throw new Exception("Cannot start application without any token!");
        }

        apiService = new ApiService(token);

        // Use apiService.GetCurrentUser once the token is provided.
        StartCoroutine(apiService.GetCurrentUser((response) =>
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
        //string trainingModuleId = "60a8a0b2263bf7108854305e";
        string trainingModuleId = LaunchArgsService.GetModuleId();
        
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

    public void CreateNewTask(string taskName, TaskType taskType)
    {
        Task newTask = new Task(taskName, taskType);

        StartCoroutine(apiService.CreateTask(newTask, obj =>
        {
            if (obj is BackendErrorResponse error)
            {
                Debug.LogError($"Error updating training module code {error.Status}: {error.Message}");
            }
            else if (obj is Task t)
            {
                trainingModule.Tasks.Add(t);
                UpdateTrainingModule();
            }
        }));
    }

    public void UpdateTrainingName(string newName)
    {
        trainingModule.Name = newName;
        UpdateTrainingModule();
    }

    public void UpdateTrainingDescription(string description)
    {
        trainingModule.Description = description;
        UpdateTrainingModule();
    }

    public void ReorderTask(int fromIndex, int toIndex)
    {
        Task tempTask = trainingModule.Tasks[fromIndex];
        trainingModule.Tasks[fromIndex] = trainingModule.Tasks[toIndex];
        trainingModule.Tasks[toIndex] = tempTask;
        UpdateTrainingModule();
    }

    public void UpdateTask(Task task)
    {
        StartCoroutine(apiService.UpdateTask(task, (obj) =>
        {
            if (obj is BackendErrorResponse error)
            {
                Debug.LogError($"Error updating task code {error.Status}: {error.Message}");
            }
            
            OnTrainingModuleChanged?.Invoke();
        }));
    }

    public void RemoveTask(Task task)
    {
        trainingModule.Tasks.Remove(task);
        UpdateTrainingModule();
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

    public void UpdateTrainingModule()
    {
        StartCoroutine(apiService.UpdateTrainingModule(trainingModule, (obj) =>
        {
            if (obj is BackendErrorResponse error)
            {
                Debug.LogError($"Error updating training module code {error.Status}: {error.Message}");
            }
            
            OnTrainingModuleChanged?.Invoke();
        }));
    }

    /// Sets a recipe for the task. If there is an existing recipe, update it. Otherwise make a new one.
    public void UpdateTaskRecipe(Task task, Recipe recipe)
    {
        if (task.Recipe == null)
        {
            StartCoroutine(apiService.CreateRecipe(recipe, (obj) =>
            {
                if (obj is BackendErrorResponse error)
                {
                    Debug.LogError($"Error updating recipe code {error.Status}: {error.Message}");
                }
                else if (obj is Recipe newRecipe)
                {
                    task.Recipe = newRecipe;
                }
                
                UpdateTrainingModule();
            }));
        }
        else
        {
            task.Recipe.SetIngredients(recipe.Ingredients);

            StartCoroutine(apiService.UpdateRecipe(task.Recipe, (obj) =>
            {
                if (obj is BackendErrorResponse error)
                {
                    Debug.LogError($"Error updating recipe code {error.Status}: {error.Message}");
                }
                UpdateTrainingModule();
            }));
        }
    }

    public void SubmitTask(Recipe recipe, int score)
    {
        // Progress progress = new Progress(trainingModule.Id, CurrentTask.Id, "userId", true, 100);
        Progress progress = new Progress("sdfsdf", "sdf", "userId", true, score);
        progress.Data = recipe;

        StartCoroutine(apiService.SubmitTaskProgress(progress, (obj) => { 
            if (obj is BackendErrorResponse error)
            {
                Debug.LogError($"Error posting progress code {error.Status}: {error.Message}");
            }
        }));
    }

    public List<Recipe> GetAllRecipes()
    {
        // TODO fetch from backend
        
        return new List<Recipe>();
    }
}

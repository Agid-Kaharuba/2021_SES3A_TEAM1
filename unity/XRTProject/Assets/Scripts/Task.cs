
public class Task
{
    public string Name { get; private set; }
    public TaskType TaskType { get; private set; }

    public Task(string name, TaskType taskType)
    {
        Name = name;
        TaskType = taskType;
    }
}
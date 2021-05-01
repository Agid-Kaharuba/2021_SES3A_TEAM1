using System.Collections.Generic;

public class TrainingModule
{
    public List<Task> tasks = new List<Task>();
    
    public string Name { get; private set; }
    
    public string Description { get; set; }

    public TrainingModule(string name)
    {
        Name = name;
        Description = "No Description";
    }
}
using System.Collections.Generic;
using Valve.Newtonsoft.Json;

[JsonObject(MemberSerialization.OptIn)]
public class TrainingModule
{
    [JsonProperty("tasks")]
    public List<Task> Tasks { get; } = new List<Task>();
    
    [JsonProperty("name")]
    public string Name { get; private set; }
    
    [JsonProperty("description")]
    public string Description { get; set; }

    public TrainingModule(string name)
    {
        Name = name;
        Description = "No Description";
    }
}
using System.Collections.Generic;
using Valve.Newtonsoft.Json;

[JsonObject(MemberSerialization.OptIn)]
public class TrainingModule
{
    [JsonProperty("_id")]
    public string Id { get; private set; }
    
    [JsonProperty("tasks")]
    public List<Task> Tasks { get; } = new List<Task>();
    
    [JsonProperty("name")]
    public string Name { get; set; }
    
    [JsonProperty("description")]
    public string Description { get; set; }

    public TrainingModule(string name, string id)
    {
        Name = name;
        Description = "No Description";
        Id = id;
    }
}
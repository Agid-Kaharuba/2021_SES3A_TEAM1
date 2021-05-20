using Valve.Newtonsoft.Json;
using Valve.Newtonsoft.Json.Converters;

[JsonObject(MemberSerialization.OptIn)]
public class Task
{
    [JsonProperty("_id")]
    public string Id { get; private set; }

    [JsonProperty("name")]
    public string Name { get; private set; }
    
    [JsonProperty("type")]
    [JsonConverter(typeof(StringEnumConverter))]
    public TaskType TaskType { get; private set; }

    /// This may be null if it does not have a recipe
    [JsonProperty("recipe")]
    public Recipe Recipe { get; set; }

    public bool HasRecipe => Recipe != null;

    public bool ShouldShowRecipe => HasRecipe && TaskType == TaskType.Recipe;

    public Task(string name, TaskType taskType)
    {
        Name = name;
        TaskType = taskType;
    }
}
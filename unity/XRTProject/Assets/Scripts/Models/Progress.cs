using System.Collections.Generic;
using Valve.Newtonsoft.Json;

[JsonObject(MemberSerialization.OptIn)]
public class Progress
{
    [JsonProperty("_id")]
    public string Id { get; private set; }

    [JsonProperty("courseId")]
    public string Course { get; private set; }

    [JsonProperty("taskId")]
    public string Task { get; private set; }

    [JsonProperty("userId")]
    public string User { get; private set; }

    [JsonProperty("completed")]
    public bool Completed { get; private set; }

    [JsonProperty("score")]
    public int Score { get; private set; }


    public Progress(string course, string task, string user, bool completed, int score)
    {
        Course = course;
        Task = task;
        User = user;
        Completed = completed;
        Score = score;
    }
}
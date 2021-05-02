using System.Collections.Generic;
using Valve.Newtonsoft.Json;

[JsonObject(MemberSerialization.OptIn)]
public class User
{
    [JsonProperty("username")]
    public string Username { get; private set; }

    [JsonProperty("password")]
    public string Password { get; private set; }

    [JsonProperty("firstname")]
    public string Firstname { get; private set; }

    [JsonProperty("lastname")]
    public string Lastname { get; private set; }

    [JsonProperty("email")]
    public string Email { get; private set; }

    [JsonProperty("staffid")]
    public string StaffId { get; private set; }

    [JsonProperty("isSupervisor")]
    public string IsSupervisor { get; private set; }

    [JsonProperty("token")]
    public string Token { get; private set; }

    public User(string username, string password)
    {
        Username = username;
        Password = password;
    }
}
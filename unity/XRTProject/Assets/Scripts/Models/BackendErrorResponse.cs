using System.Collections.Generic;
using Valve.Newtonsoft.Json;

[JsonObject(MemberSerialization.OptIn)]
public class BackendErrorResponse
{
    [JsonProperty("msg")]
    public string Message { get; private set; }

    //[JsonProperty("err")]
    //public string Error { get; private set; }

    [JsonProperty("data")]
    public string Data { get; private set; }

    public long Status { get; set; }

    public override string ToString()
    {
        return Message;
    }
}
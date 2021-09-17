using System;
using System.Collections.Generic;
using Valve.Newtonsoft.Json;

[JsonObject(MemberSerialization.OptIn)]
public class Tracking
{
    [JsonProperty("_id")]
    public string Id { get; private set; }

    [JsonProperty("date")]
    public DateTime Date { get; private set; }

    [JsonProperty("event")]
    public string Event { get; private set; }

    [JsonProperty("value")]
    public string Value { get; private set; }

    [JsonProperty("data")]
    public object Data { get; set; }


    public Tracking(DateTime date, string e, string value)
    {
        Date = date;
        Event = e;
        Value = value;
    }

    public override string ToString()
    {
        return $"{Date} {Event} {Value}";
    }
}
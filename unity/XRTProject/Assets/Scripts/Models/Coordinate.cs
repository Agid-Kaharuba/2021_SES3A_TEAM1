using Valve.Newtonsoft.Json;
using Valve.Newtonsoft.Json.Converters;

[JsonObject ( MemberSerialization.OptIn )]
public class Coordinate {

    [JsonProperty ( "i" )]
    public string objectType { get; set; }

    [JsonProperty ( "x" )]
    public int posX { get; set; }

    [JsonProperty ( "y" )]
    public int posY { get; set; }
}

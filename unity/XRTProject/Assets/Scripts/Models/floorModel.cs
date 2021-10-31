using System.Collections.Generic;
using Valve.Newtonsoft.Json;

[JsonObject(MemberSerialization.OptIn)]
public class FloorModel {
    [JsonProperty ( "coordinate" )]
    public List<Coordinate> coordinate { get; } = new List<Coordinate> ();

    [JsonProperty("_id")]
    public string Id { get; private set; }

    public FloorModel (string id) {
        Id = id;
    }
}
using System;
using Valve.Newtonsoft.Json;


public class PropConverter : JsonConverter
{
    public override void WriteJson(JsonWriter writer, object value, JsonSerializer serializer)
    {
        PropData propData = (PropData) value;
        writer.WriteValue(propData.PropId);
    }

    public override object ReadJson(JsonReader reader, Type objectType, object existingValue, JsonSerializer serializer)
    {
        string propId = (string )reader.Value;
        PropData propData = PropManager.Instance.GetProp(propId);

        if (propData == null)
        {
            throw new ArgumentNullException($"Could not find prop with propId {propId}");
        }

        return propData;
    }

    public override bool CanConvert(Type objectType)
    {
        return objectType == typeof(PropData);
    }
}
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace XRT_Project
{
    [BsonIgnoreExtraElements] //Ignore unwanted fields
    public class Shipwreck
    {
        [BsonId]
        public ObjectId Id { get; set; }

        [BsonElement("feature_type")] //Aliases
        public string FeatureType { get; set; }

        [BsonElement("latdec")]
        public double Latitude { get; set; }

        [BsonElement("londec")]
        public double Longitude { get; set; }
    }
}
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using MongoDB.Driver;
using MongoDB.Bson;
using XRT_Project;

namespace XRT_Project.Controller
{
    [ApiController]
    [Route("[controller]")]
    public class ShipwreckController : ControllerBase
    {
        private IMongoCollection<Shipwreck> ShipWreckCollection;

        public ShipwreckController(IMongoClient client)
        {
            var database = client.GetDatabase("sample_geospatial");
            ShipWreckCollection = database.GetCollection<Shipwreck>("shipwrecks");
        }

        [HttpGet]
        public IEnumerable<Shipwreck> Get()
        {
            return ShipWreckCollection.Find(s => s.FeatureType == "Wrecks - Visible").ToList();
        }

        [HttpPost]
        public void Post(Shipwreck shipwreck)
        {
            ShipWreckCollection.InsertOne(shipwreck);
        }

        [HttpPut]
        [Route("{Id}")]
        public void Put(string Id, [FromBody]Shipwreck shipwreck)
        {
            shipwreck.Id = ObjectId.Parse(Id);
            ShipWreckCollection.ReplaceOne(Builders<Shipwreck>.Filter.Eq(s => s.Id, ObjectId.Parse(Id)), shipwreck);
        }

        [HttpDelete]
        [Route("{Id}")]
        public void Delete(string Id)
        {
            ShipWreckCollection.DeleteOne(Builders<Shipwreck>.Filter.Eq(s => s.Id, ObjectId.Parse(Id)));
        }
    }
}

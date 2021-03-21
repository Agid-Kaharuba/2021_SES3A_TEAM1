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
    }
}

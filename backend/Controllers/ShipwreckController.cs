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
        private readonly ILogger<ShipwreckController> _logger;

        public ShipwreckController(ILogger<ShipwreckController> logger)
        {
            _logger = logger;
        }

        [HttpGet]
        public IEnumerable<Shipwreck> Get()
        {
            var client = new MongoClient("mongodb+srv://admin:admin@trainingxr.h7o4w.mongodb.net/sample_geospatial?retryWrites=true&w=majority");
            var database  = client.GetDatabase("sample_geospatial");
            var collection = database.GetCollection<Shipwreck>("shipwrecks");
            return collection.Find(s => s.FeatureType == "Wrecks - Visible").ToList();
        }
    }
}

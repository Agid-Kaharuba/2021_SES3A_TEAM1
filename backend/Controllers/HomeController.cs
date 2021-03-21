using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using MongoDB.Driver;
using MongoDB.Bson;
using XRT_Project;
namespace XRT_Project.Controllers
{
    public class Message
    {
        public Message(string msg)
        {
            this.msg = msg;
        }

        public string msg { get; set; }
    }

    [ApiController]
    [Route("")]
    public class HomeController : ControllerBase
    {

        [HttpGet]
        public Message Get()
        {
            Message msg = new Message("REST API for Training XR 🚀🚀🚀🚀");
            return msg;
        }
    }
}

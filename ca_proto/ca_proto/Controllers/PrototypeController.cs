using ca_proto.Filters;
using ca_proto.Models;
using ca_service.Interfaces;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ca_proto.Controllers
{
    [Route("api/[controller]")]
    public class PrototypeController:Controller
    {
        private readonly IPrototypeService prototypeService;

        public PrototypeController(IPrototypeService prototypeService)
        {
            this.prototypeService = prototypeService;
        }

        [AdministratorFilter]
        [HttpPost("DeleteAllEntities")]
        public IActionResult DeleteAllEntities()
        {
            try
            {
                return Json(prototypeService.DeleteAllEntities());
            }
            catch (Exception x)
            {
                return Json(new ErrorReport { Error = x.Message });
            }
        }

        [AdministratorFilter]
        [HttpPost("GenerateOrders")]
        public IActionResult GenerateOrders([FromBody]int count)
        {
            try
            {
                return Json(prototypeService.GenerateOrders(count));
            }
            catch (Exception x)
            {
                return Json(new ErrorReport { Error = x.Message });
            }
        }

    }
}

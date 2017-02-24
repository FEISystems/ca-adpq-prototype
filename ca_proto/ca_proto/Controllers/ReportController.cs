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
    public class ReportController : Controller
    {
        private readonly IReportService reportService;

        public ReportController(IReportService reportService)
        {
            this.reportService = reportService;
        }

        //[AdministratorFilter]
        [HttpPost("GetOrderProducts")]
        public IActionResult GetOrderProducts([FromBody]OrderProductQuery query)
        {
            try
            {
                return Json(reportService.GetOrderProducts(query.Start, query.End));
            }
            catch (Exception x)
            {
                return Json(new ErrorReport { Error = x.Message });
            }
        }

    }
}

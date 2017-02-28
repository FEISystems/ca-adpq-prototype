using ca_proto.Filters;
using ca_proto.Helpers;
using ca_proto.Models;
using ca_service.Entities;
using ca_service.Interfaces;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ca_proto.Controllers
{
    [Route("api/[controller]")]
    public class ReportController : Controller
    {
        private readonly IReportService reportService;

        public object StringBuiler { get; private set; }

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
                if (null == query)
                {
                    throw new Exception("Invalid query. Please check the filter settings and try again.");
                }
                return Json(HydrateOrderProducts(reportService.GetOrderProducts(query.Start, query.End)));
            }
            catch (Exception x)
            {
                return Json(new ErrorReport { Error = x.Message });
            }
        }

        [HttpGet("DownloadCSV")]
        public IActionResult DownloadCSV([FromQuery]DateTime start, [FromQuery] DateTime end)
        {
            StringBuilder result = new StringBuilder();
            result.AppendLine("OrderId,CreateDate,PaymentMethod,Status,Price,Quantity,Total,ProductType,Contractor");
            try
            {
                foreach (OrderProductReportItem reportItem in HydrateOrderProducts(reportService.GetOrderProducts(start, end)))
                {
                    result.AppendFormat("{0},{1},{2},{3},\"{4}\",{5},\"{6}\",{7},{8}\r\n", reportItem.OrderId, reportItem.CreateDate,
                        reportItem.PaymentMethod, reportItem.Status, reportItem.Price, reportItem.Quantity,
                        reportItem.Total, reportItem.ProductType, reportItem.Contractor);
                }
                var binaryResult = new BinaryResult
                {
                    ContentType = "text/csv",
                    Data = System.Text.Encoding.ASCII.GetBytes(result.ToString()),
                    FileName = "ReportData.csv"
                };
                return binaryResult;
            }
            catch (Exception x)
            {
                return Json(new ErrorReport { Error = x.Message });
            }
        }

        private IEnumerable<OrderProductReportItem> HydrateOrderProducts(IEnumerable<OrderProduct> orderProducts)
        {
            if (null == orderProducts)
                yield break;
            foreach (var orderProduct in orderProducts)
            {
                yield return new OrderProductReportItem(orderProduct);
            }
        }

    }
}

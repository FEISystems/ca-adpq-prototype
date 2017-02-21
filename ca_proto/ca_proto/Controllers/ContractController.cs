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
    public class ContractController : Controller
    {
        private readonly IContractService contractService;

        public ContractController(IContractService contractService)
        {
            this.contractService = contractService;
        }

        [HttpGet("Test")]
        public string Test()
        {
            StringBuilder result = new StringBuilder();
            Contract contract = new Contract(0) { Number = "Test Contract" };
            try
            {
                result.AppendLine("Beginning test");
                result.AppendLine(string.Format("Have {0} row(s)", contractService.Fetch(0, int.MaxValue).Count()));
                contractService.Add(contract);
                result.AppendLine("Added contract: " + contract.Id);
                result.AppendLine(string.Format("Have {0} row(s)", contractService.Fetch(0, int.MaxValue).Count()));
                contract.Number += " - updated";
                contractService.Update(contract);
                result.AppendLine("Updated contract: " + contract.Id);
                contractService.Delete(contract.Id);
                result.AppendLine("Deleted contract: " + contract.Id);
                result.AppendLine(string.Format("Have {0} row(s)", contractService.Fetch(0, int.MaxValue).Count()));
                result.AppendLine("test success: " + contract.Id.ToString());
                return result.ToString();
            }
            catch (Exception x)
            {
                return x.Message;
            }
        }

        [HttpGet("Fetch")]
        public IActionResult Fetch()
        {
            return Json(contractService.Fetch(0, int.MaxValue));
        }

        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            return Json(contractService.Get(id));
        }

        [HttpPost("Query")]
        public IActionResult Query([FromBody]DbQuery query)
        {
            if (null == query)
                return Json(new Contract[0]);
            contractService.OrderAscending = query.OrderAscending;
            contractService.OrderColumnName = query.OrderByColumn;
            return Json(contractService.Fetch(query.Start, query.Count));
        }

        [HttpGet("Lookups")]
        public IActionResult Lookups()
        {
            throw new Exception("Move to Lookups Controller");
        }
    }
}

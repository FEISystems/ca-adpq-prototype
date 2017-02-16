using ca_service.Entities;
using ca_service.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ca_proto.Controllers
{
    [Route("api/[controller]")]
    public class InventoryController: Controller
    {
        private readonly IInventoryService inventoryService;

        public InventoryController(IInventoryService inventoryService)
        {
            this.inventoryService = inventoryService;
        }

        [HttpGet("Test")]
        public string Test()
        {
            StringBuilder result = new StringBuilder();
            Product product = new Product(0)
            {
                CategoryId = 1,
                ContractId = 1,
                ContractPrice = 100.0m,
                ListPrice = 150.0m,
                Manufacturer = "mfg 1",
                ManufacturerPartNumber = "mpn 1",
                Name = "product 1",
                ProductType = ProductType.Hardware,
                SKU = "sku 1",
                ValidAsAddOnForParentCategories = new List<int>()
            };
            try
            {
                result.AppendLine("Beginning test");
                result.AppendLine(string.Format("Have {0} row(s)", inventoryService.Fetch().Count()));
                inventoryService.Add(product);
                result.AppendLine("Added product: " + product.Id);
                result.AppendLine(string.Format("Have {0} row(s)", inventoryService.Fetch().Count()));
                product.Name += " - updated";
                inventoryService.Update(product);
                result.AppendLine("Updated product: " + product.Id);
                inventoryService.Delete(product.Id);
                result.AppendLine("Deleted product: " + product.Id);
                result.AppendLine(string.Format("Have {0} row(s)", inventoryService.Fetch().Count()));
                result.AppendLine("test success: " + product.Id.ToString());
                return result.ToString();
            }
            catch (Exception x)
            {
                return x.Message;
            }
        }

        [HttpPost("Import")]
        public ActionResult Import(IFormFile file)
        {
            if (null != file &&  file.Length > 0)
            {
                using (var stream = file.OpenReadStream())
                {
                    using (var reader = new System.IO.StreamReader(stream))
                    {
                        string s = reader.ReadToEnd();
                        inventoryService.Import(s);
                    }
                }
            }
            return new EmptyResult();
        }

        [HttpGet("Fetch")]
        public Product[] Fetch()
        {
            return inventoryService.Fetch().ToArray();
        }

        [HttpGet("{id}")]
        public Product Get(int id)
        {
            return inventoryService.Get(id);
        }
    }
}

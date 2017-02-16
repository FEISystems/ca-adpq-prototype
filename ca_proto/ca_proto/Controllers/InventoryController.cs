using ca_service.Entities;
using ca_service.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
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

                inventoryService.Add(product);

                product.Name += " - updated";

                inventoryService.Update(product);

                inventoryService.Delete(product.Id);

                return "test success: " + product.Id.ToString();
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
    }
}

using ca_proto.Models;
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
    public class InventoryController : Controller
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
                //CLIN 
                //UNSPSC
                //Description 
                //UnitOfMeasure 
                //QuantityPerUnitOfMeasure 
                //ContractDiscount 
                //ContractNumber 
                //Contractor
                //ContractExpiration 
                //Title 
                //ListPrice 
                //ContractPrice 
                //Manufacturer
                //ManufacturerPartNumber 
                //SKU 
                //ProductType 
                //Category 
                CLIN = "clin001",
                UNSPSC = "unspsc01",
                Description = "This is a long description. Parts of it will be extracted to be used as the title. This is done by a person, not by the system.",
                UnitOfMeasure = "EACH",
                QuantityPerUnitOfMeasure = "UnitOfMeasure",
                ContractDiscount = "50%",
                ContractNumber = "Contract111222",
                Contractor = "Contractor A",
                ContractExpiration = DateTime.Now.AddYears(1),
                Title = "This is a long description.",
                ListPrice = 150.0m,
                ContractPrice = 100.0m,
                Manufacturer = "mfg 1",
                ManufacturerPartNumber = "mpn 1",
                SKU = "sku 1",
                ProductType = ProductType.Hardware.ToString(),
                Category = "Category 1",
            };
            try
            {
                result.AppendLine("Beginning test");
                result.AppendLine(string.Format("Have {0} row(s)", inventoryService.Fetch(0, int.MaxValue, null).Count()));
                inventoryService.Add(product);
                result.AppendLine("Added product: " + product.Id);
                result.AppendLine(string.Format("Have {0} row(s)", inventoryService.Fetch(0, int.MaxValue, null).Count()));
                product.Title += " - updated";
                inventoryService.Update(product);
                result.AppendLine("Updated product: " + product.Id);
                inventoryService.Delete(product.Id);
                result.AppendLine("Deleted product: " + product.Id);
                result.AppendLine(string.Format("Have {0} row(s)", inventoryService.Fetch(0, int.MaxValue, null).Count()));
                result.AppendLine("test success: " + product.Id.ToString());
                return result.ToString();
            }
            catch (Exception x)
            {
                return x.Message;
            }
        }

        [HttpPost("Import")]
        public ActionResult Import([FromBody] ImportFile file)
        {
            if (null != file)
            {
                if (!string.IsNullOrWhiteSpace(file.content))
                {
                    return Json(inventoryService.Import(file.content));
                }
            }
            return new EmptyResult();
        }

        [HttpGet("Fetch")]
        public ActionResult Fetch()
        {
            return Json(inventoryService.Fetch(0, int.MaxValue, null));
        }

        [HttpPost("Query")]
        public IActionResult Query([FromBody]DbQuery query)
        {
            if (null == query)
                return Json(new Product[0]);
            inventoryService.OrderAscending = query.OrderAscending;
            inventoryService.OrderColumnName = query.OrderByColumn;
            return Json(inventoryService.Fetch(query.Start, query.Count, query.Filter));
        }

        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            return Json(inventoryService.Get(id));
        }

        [HttpPost("Add")]
        public ActionResult Add([FromBody] Product product)
        {
            inventoryService.Add(product);
            return new EmptyResult();
        }

        [HttpPost("Update")]
        public ActionResult Update([FromBody] Product product)
        {
            inventoryService.Update(product);
            return new EmptyResult();
        }

        [HttpGet("ProductTypes")]
        public ActionResult ProductTypes()
        {
            throw new Exception("Move to Lookups Controller");
        }

        [HttpPost("Delete")]
        public ActionResult Delete([FromBody]int id)
        {
            inventoryService.Delete(id);
            return new EmptyResult();
        }

        [HttpPost("quicksearch")]
        public ActionResult QuickSearch([FromBody]QuickSearch searchTerms)
        {
            //search terms can be comma delimited, turn them into a comma-separated list
            var terms = (searchTerms?.SearchTerm ?? "").Split(",".ToCharArray(), StringSplitOptions.RemoveEmptyEntries);

            var results = inventoryService.QuickSearch(terms);

            //todo: create a DTO for products for the UI side
            return Json(results);
        }

        [HttpPost("advancedsearch")]
        public ActionResult AdvancedSearch([FromBody]AdvancedSearch searchTerms)
        {
            searchTerms = searchTerms ?? new Models.AdvancedSearch();

            var results = inventoryService.AdvancedSearch(searchTerms.Name, searchTerms.Category, searchTerms.MinPrice, searchTerms.MaxPrice, searchTerms.Manufacturer, searchTerms.ManufacturerPartNumber, searchTerms.SKU);

            return Json(results);
        }

        [HttpPost("Count")]
        public IActionResult Count([FromBody]IDictionary<string, object> filter)
        {
            return Json(inventoryService.Count(filter));
        }

        [HttpPost("FetchByCategories")]
        public IActionResult FetchByCategories([FromBody]CategoriesSearch searchCriteria)
        {
            return Json(inventoryService.FetchByCategories(searchCriteria.Start, searchCriteria.Count, searchCriteria.Categories));
        }
    }
}

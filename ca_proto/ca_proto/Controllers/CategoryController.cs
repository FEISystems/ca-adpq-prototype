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
    public class CategoryController : Controller
    {
        private readonly ICategoryService categoryService;

        public CategoryController(ICategoryService categoryService)
        {
            this.categoryService = categoryService;
        }

        [HttpGet("Test")]
        public string Test()
        {
            StringBuilder result = new StringBuilder();
            Category category = new Category(0) { Name = "TestCat" };
            try
            {
                result.AppendLine("Beginning test");
                result.AppendLine(string.Format("Have {0} row(s)", categoryService.Fetch().Count()));
                categoryService.Add(category);
                result.AppendLine("Added category: " + category.Id);
                result.AppendLine(string.Format("Have {0} row(s)", categoryService.Fetch().Count()));
                category.Name += " - updated";
                categoryService.Update(category);
                result.AppendLine("Updated category: " + category.Id);
                categoryService.Delete(category.Id);
                result.AppendLine("Deleted category: " + category.Id);
                result.AppendLine(string.Format("Have {0} row(s)", categoryService.Fetch().Count()));
                result.AppendLine("test success: " + category.Id.ToString());
                return result.ToString();
            }
            catch (Exception x)
            {
                return x.Message;
            }

        }
    }
}
using ca_service.Entities;
using ca_service.Interfaces;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ca_proto.Controllers
{
    [Route("api/[controller]")]
    public class LookupsController: Controller
    {
        private readonly IContractService contractService;
        private readonly ICategoryService categoryService;
        private readonly IContractorService contractorService;
        private readonly IImageService imageService;

        public LookupsController(IContractService contractService, ICategoryService categoryService,
            IContractorService contractorService, IImageService imageService)
        {
            this.contractService = contractService;
            this.categoryService = categoryService;
            this.contractorService = contractorService;
            this.imageService = imageService;
        }

        [HttpGet("ProductTypes")]
        public ActionResult ProductTypes()
        {
            return Json(Enum.GetValues(typeof(ProductType)).Cast<ProductType>().Select(item => item.ToString()));
        }

        [HttpGet("Contracts")]
        public IActionResult Contracts()
        {
            contractService.OrderAscending = true;
            contractService.OrderColumnName = "Number";
            return Json(contractService.Fetch(0, int.MaxValue).Select(item => item.Number));
        }

        [HttpGet("Contractors")]
        public IActionResult Contractors()
        {
            contractorService.OrderAscending = true;
            contractorService.OrderColumnName = "Name";
            return Json(contractorService.Fetch(0, int.MaxValue).Select(item => item.Name));
        }

        [HttpGet("Categories")]
        public IActionResult Categories()
        {
            return Json(categoryService.Fetch().Select(item => item.Name));
        }

        [HttpGet("UnitsOfMeasure")]
        public IActionResult UnitsOfMeasure()
        {
            return Json(Enum.GetValues(typeof(UnitOfMeasure)).Cast<UnitOfMeasure>().Select(item => item.ToString()));
        }

        [HttpGet("ImageFileNames")]
        public IActionResult ImageFilenames()
        {
            return Json(imageService.GetImageFileNames());
        }
    }
}

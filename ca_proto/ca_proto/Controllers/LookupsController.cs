using ca_service.Entities;
using ca_service.Interfaces;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Reflection;
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
        public IActionResult ImageFileNames()
        {
            return Json(imageService.GetImageFileNames());
        }

        [HttpGet("PaymentMethods")]
        public IActionResult PaymentMethods()
        {
            var vals = Enum.GetValues(typeof(OrderPaymentMethod)).Cast<OrderPaymentMethod>();

            return Json(vals.Select(x => new { Id = (int)x, Description = GetEnumDescription((OrderPaymentMethod)x) }));
        }

        public static string GetEnumDescription(Enum value)
        {
            FieldInfo fi = value.GetType().GetField(value.ToString());

            DescriptionAttribute[] attributes =
                (DescriptionAttribute[])fi.GetCustomAttributes(
                typeof(DescriptionAttribute),
                false);

            if (attributes != null &&
                attributes.Length > 0)
                return attributes[0].Description;
            else
                return value.ToString();
        }

    }
}

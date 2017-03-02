using ca_service.Entities;
using ca_service.Interfaces;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Reflection;
using System.Threading.Tasks;
using ca_proto.Helpers;
using ca_proto.Models;

namespace ca_proto.Controllers
{
    [Route("api/[controller]")]
    public class LookupsController: Controller
    {
        private readonly IContractService contractService;
        private readonly ICategoryService categoryService;
        private readonly IContractorService contractorService;
        private readonly IImageService imageService;
        private readonly IInventoryService inventoryService;

        public LookupsController(IContractService contractService, ICategoryService categoryService,
            IContractorService contractorService, IImageService imageService, IInventoryService inventoryService)
        {
            this.contractService = contractService;
            this.categoryService = categoryService;
            this.contractorService = contractorService;
            this.imageService = imageService;
            this.inventoryService = inventoryService;
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
            return Json(vals.Select(x => new { Id = (int)x, Description = x.Description() }));
        }

        [HttpGet("OrderStatus")]
        public IActionResult OrderStatus()
        {
            var vals = Enum.GetValues(typeof(OrderStatus)).Cast<OrderStatus>();
            return Json(vals.Select(x => new { Id = (int)x, Description = x.Description() }));
        }

        [HttpGet("OrderStatusSimple")]
        public IActionResult OrderStatusSimple()
        {
            return Json(Enum.GetValues(typeof(OrderStatus)).Cast<OrderStatus>().Select(item => item.ToString()));
        }

        [HttpGet("Manufacturer")]
        public IActionResult Manufacturer()
        {
            return Json(inventoryService.GetManufacturerNames().OrderBy(item => item));
        }
    }
}

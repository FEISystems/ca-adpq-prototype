using System;
using System.Collections.Generic;
using System.Linq;
using ca_proto.Models;
using ca_proto.Helpers;
using Microsoft.AspNetCore.Mvc;
using ca_service.Interfaces;
using ca_service.Entities;
using Microsoft.Extensions.Configuration;

namespace ca_proto.Controllers
{
    /// <summary>
    /// A controller intercepts the incoming browser request and returns
    /// an HTML view (.cshtml file) or any other type of data.
    /// </summary>
    public class HomeController : Controller
    {
        public IUserService userService;

        public HomeController(IUserService userService)
        {
            this.userService = userService;
        }

        public IActionResult Index()
        {
            return View();
        }

        public IActionResult About()
        {
            return View(this.userService.GetUsers());
        }
    }
}

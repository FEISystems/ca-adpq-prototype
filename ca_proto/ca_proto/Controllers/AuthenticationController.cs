using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;
using ca_service.Interfaces;
using ca_proto.Helpers;
// For more information on enabling Web API for empty projects, visit http://go.microsoft.com/fwlink/?LinkID=397860

namespace ca_proto.Controllers
{
    [Route("api/[controller]")]
    public class AuthenticationController : Controller
    {
        private IUserService userservice;
        public AuthenticationController(IUserService userservice)
        {
            this.userservice = userservice;
        }

        // GET api/values/5
        [HttpGet("{token}")]
        public string Get(string token)
        {
            return this.userservice.IsAuthenticated(token).ToString();
        }

        // POST api/values
        [HttpPost]
        public IActionResult Post([FromBody] Models.Credentials credentials)
        {
            var login = this.userservice.Authenticate(credentials.username, credentials.password);
            if (!string.IsNullOrEmpty(login.Token))
            {
                CookieOptions options = new CookieOptions();
                options.Expires = DateTime.Now.AddDays(1);
                Response.Cookies.Append(Helpers.Helpers.AuthToken, login.Token, options);
            }
            return Json(login);
        }

        [HttpPost("Create")]
        public IActionResult Create([FromBody] Models.Credentials credentials)
        {
            return Json(this.userservice.CreateUser(credentials.username, credentials.password));
        }


        // DELETE api/values/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}

using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using ca_service.Interfaces;
using ca_service.Entities;
using ca_proto.Helpers;
// For more information on enabling Web API for empty projects, visit http://go.microsoft.com/fwlink/?LinkID=397860

namespace ca_proto.Controllers
{
    [Route("api/[controller]")]
    public class ShoppingCartController : Controller
    {
        private readonly IShoppingCartService shoppingCartService;
        public ShoppingCartController(IShoppingCartService shoppingCartService)
        {
            this.shoppingCartService = shoppingCartService;
        }
        // GET: api/values
        [HttpGet]
        public IEnumerable<ShoppingCart> Get()
        {
            throw new NotImplementedException();
        }

        // GET api/values/5
        [HttpGet("{id}")]
        public ShoppingCart Get(int id)
        {
            return shoppingCartService.GetCart(id);
        }

        // POST api/values
        [HttpPost]
        public ShoppingCart Post([FromBody]int productId)
        {
            var userId = HttpContext.GetUserId();
            if (!userId.HasValue)
                throw new Exception("Please login first");
            return shoppingCartService.AddItemToCart(productId, userId.Value);
        }

        // PUT api/values/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE api/values/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}

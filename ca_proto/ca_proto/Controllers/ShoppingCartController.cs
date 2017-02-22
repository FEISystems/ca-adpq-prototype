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

        [HttpGet("{id}")]
        public ShoppingCart Get(int id)
        {
            return shoppingCartService.GetCart(id);
        }

        // GET: api/values
        [HttpGet("GetActive")]
        public ShoppingCart GetActive()
        {
            var userId = HttpContext.GetUserId();
            if (!userId.HasValue)
                throw new Exception("Please login first");
            return shoppingCartService.GetActiveCart(userId.Value);
        }

        // GET api/values/5
        [HttpGet("GetAll")]
        public List<ShoppingCart> GetAll()
        {
            var userId = HttpContext.GetUserId();
            if (!userId.HasValue)
                throw new Exception("Please login first");

            return shoppingCartService.GetCarts(userId.Value);
        }

        // POST api/values
        [HttpPost("AddItem")]
        public ShoppingCart Post([FromBody]int productId)
        {
            var userId = HttpContext.GetUserId();
            if (!userId.HasValue)
                throw new Exception("Please login first");
            return shoppingCartService.AddItemToCart(productId, userId.Value);
        }
        
        // DELETE api/values/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}

using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using ca_service.Interfaces;
using ca_service.Entities;
using ca_proto.Helpers;
using ca_proto.Filters;
// For more information on enabling Web API for empty projects, visit http://go.microsoft.com/fwlink/?LinkID=397860

namespace ca_proto.Controllers
{
    [AuthenticationFilter]
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

        [HttpPost("ClearCart")]
        public ShoppingCart ClearCart()
        {
            var userId = HttpContext.GetUserId();
            if (!userId.HasValue)
                throw new Exception("Please login first");
            return shoppingCartService.ClearShoppingCart(userId.Value);
        }

        [HttpPost("DeactivateCart")]
        public void DeactivateCart()
        {
            var userId = HttpContext.GetUserId();
            if (!userId.HasValue)
                throw new Exception("Please login first");
            shoppingCartService.DeactivateCart(userId.Value);
        }


        [HttpPost("CompleteCart")]
        public ShoppingCart CompleteCart()
        {
            var userId = HttpContext.GetUserId();
            if (!userId.HasValue)
                throw new Exception("Please login first");
            return shoppingCartService.CompleteCart(userId.Value);
        }

        // DELETE api/values/5
        [HttpDelete("RemovedItem/{id}")]
        public ShoppingCart RemovedItem(int id)
        {
            var userId = HttpContext.GetUserId();
            if (!userId.HasValue)
                throw new Exception("Please login first");
            return shoppingCartService.RemoveItemFromCart(id, userId.Value);
        }
    }
}

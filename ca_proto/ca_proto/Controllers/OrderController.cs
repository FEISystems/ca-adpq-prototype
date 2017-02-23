using ca_proto.Filters;
using ca_service.Entities;
using ca_service.Interfaces;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ca_proto.Controllers
{
    [AuthenticationFilter]
    [Route("api/[controller]")]
    public class OrderController : Controller
    {
        private readonly IOrderService _orderService;

        public OrderController(IOrderService orderService)
        {
            _orderService = orderService;
        }

        [HttpGet("{id}")]
        public Order Get(int id)
        {
            return _orderService.Get(id);
        }

        [HttpGet("GetUserOrders/{userId}")]
        public List<Order> GetUserOrders(int userId)
        {
            return _orderService.GetOrdersForUser(userId);
        }

        [HttpPost("CancelOrder/{orderId}")]
        public Order CancelOrder(int orderId)
        {
            return _orderService.CancelOrder(orderId);
        }
    }
}

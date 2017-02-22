using ca_service.Entities;
using ca_service.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ca_service.Services
{
    public class OrderService : IOrderService, IDisposable
    {
        private readonly IOrderRepository _orderRepository;
        private readonly IOrderItemRepository _orderItemRepository;

        public OrderService(IOrderRepository orderRepository, IOrderItemRepository orderItemRepository)
        {
            _orderRepository = orderRepository;
            _orderItemRepository = orderItemRepository;
        }

        public Order Create(ShoppingCart cart)
        {
            //todo: implement

            return new Order();
        }

        public Order Cancel(int orderId)
        {
            //todo: implement

            return new Order();
        }

        public Order Get(int id)
        {
            var order = _orderRepository.Get(id);

            if (order == null)
                return null;

            var orderItems = _orderItemRepository.GetByOrderId(id);

            order.Items = orderItems;

            return order;
        }

        public List<Order> GetOrdersForUser(int userId)
        {
            var orders = _orderRepository.GetOrdersForUser(userId);

            foreach(var order in orders)
            {
                var orderItems = _orderItemRepository.GetByOrderId(order.Id);

                order.Items = orderItems;
            }

            return orders;
        }

        public void Dispose()
        {
            if (_orderRepository != null)
                _orderRepository.Dispose();

            if (_orderItemRepository != null)
                _orderItemRepository.Dispose();
        }
    }
}

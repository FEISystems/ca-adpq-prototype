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
        private readonly IShoppingCartRepository _shoppingCartRepository;
        private readonly IShoppingCartItemRepository _shoppingCartItemRepository;

        public OrderService(IOrderRepository orderRepository, IOrderItemRepository orderItemRepository, IShoppingCartRepository shoppingCartRepository, IShoppingCartItemRepository shoppingCartItemRepository)
        {
            _orderRepository = orderRepository;
            _orderItemRepository = orderItemRepository;
            _shoppingCartRepository = shoppingCartRepository;
            _shoppingCartItemRepository = shoppingCartItemRepository;
        }

        public Order Create(int shoppingCartId, int userId, OrderPaymentMethod paymentMethod, string address1, string address2, string address3, string city, string state, string postalCode, string emailAddress)
        {
            var cart = _shoppingCartRepository.Get(shoppingCartId);

            if (cart == null)
                throw new Exception("Shopping cart not found.");

            if (userId != cart.UserId)
                throw new Exception("Shopping cart not found.");

            var cartItems = _shoppingCartItemRepository.Fetch(shoppingCartId);

            if (cartItems == null || !cartItems.Any())
                throw new Exception("No items found in shopping cart.");

            Order newOrder = new Order()
            {
                Items = new List<OrderItem>(),
                CreateDate = DateTime.UtcNow,
                PaymentMethod = paymentMethod,
                Status = OrderStatus.Placed,
                UserId = cart.UserId,
                Address1 = address1,
                Address2 = address2,
                Address3 = address3,
                City = city,
                State = state,
                PostalCode = postalCode,
                EmailAddress = emailAddress
            };

            foreach(var item in cartItems)
            {
                OrderItem orderItem = new OrderItem()
                {
                    ProductId = item.ProductId,
                    Quantity = item.Quantity,
                    Price = item.Price
                };

                newOrder.Items.Add(orderItem);
            }

            _orderRepository.Add(newOrder);

            foreach (var orderItem in newOrder.Items)
            {
                orderItem.OrderId = newOrder.Id;
                _orderItemRepository.Add(orderItem);
            }

            foreach(var cartItem in cartItems)
            {
                _shoppingCartItemRepository.Delete(cartItem.Id);
            }

            return newOrder;
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

        public Order CancelOrder(int orderId, int userId)
        {
            var order = _orderRepository.Get(orderId);

            if (order == null)
                throw new Exception("The order specified was not found.");

            if(order.UserId != userId)
                throw new Exception("The order specified was not found.");

            order.Status = OrderStatus.UserCancelled;

            _orderRepository.Update(order);

            return order;
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

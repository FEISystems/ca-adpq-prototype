using ca_service.Entities;
using ca_service.Interfaces;
using Moq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Xunit;

namespace ca_proto_tests
{
    public class OrderServiceTests
    {
        public OrderServiceTests()
        {

        }

        [Fact]
        public void PlaceOrderReturnsOrder()
        {
            var orderRepository = new Mock<IOrderRepository>(MockBehavior.Strict);
            var orderItemRepository = new Mock<IOrderItemRepository>(MockBehavior.Strict);
            var cartRepository = new Mock<IShoppingCartRepository>(MockBehavior.Strict);
            var cartItemRepository = new Mock<IShoppingCartItemRepository>(MockBehavior.Strict);

            var orderService = new ca_service.Services.OrderService(orderRepository.Object, orderItemRepository.Object, cartRepository.Object, cartItemRepository.Object);

            int shoppingCartId = 33, userId = 99, productId = 42;

            OrderPaymentMethod paymentMethod = OrderPaymentMethod.CaliforniaDepartmentofEducation;

            ShoppingCart theCart = new ShoppingCart(shoppingCartId)
            {
                Items = new List<ShoppingCartItem>(),
                UserId = userId
            };

            cartRepository.Setup(x => x.Get(shoppingCartId)).Returns(() => theCart);

            ShoppingCartItem theItem = new ShoppingCartItem()
            {
                ShoppingCartId = shoppingCartId,
                ProductId = productId,
                Quantity = 1,
                Price = 25.00m,
            };

            List<ShoppingCartItem> cartItems = new List<ShoppingCartItem>() { theItem };

            cartItemRepository.Setup(x => x.Fetch(shoppingCartId)).Returns(() => cartItems);

            orderRepository.Setup(x => x.Add(It.IsAny<Order>()));

            orderItemRepository.Setup(x => x.Add(It.IsAny<OrderItem>()));

            cartItemRepository.Setup(x => x.Delete(It.IsAny<int>()));

            string address1 = "", address2 = "", address3 = "", city = "", state = "", zip = "", email = "";

            var result = orderService.Create(shoppingCartId, userId, paymentMethod, address1, address2, address3, city, state, zip, email);

            Assert.NotNull(result);

            Assert.Equal(paymentMethod, result.PaymentMethod);

            Assert.Equal(1, result.Items.Count);

            Assert.Equal(productId, result.Items.First().ProductId);

            orderRepository.VerifyAll();
            orderItemRepository.VerifyAll();
            cartRepository.VerifyAll();
            cartItemRepository.VerifyAll();
        }

        [Fact]
        public void PlaceOrderThrowsExceptionIfShoppingCartForOtherUser()
        {
            Mock<IOrderRepository> orderRepository = new Mock<IOrderRepository>(MockBehavior.Strict);
            Mock<IOrderItemRepository> orderItemRepository = new Mock<IOrderItemRepository>(MockBehavior.Strict);
            Mock<IShoppingCartRepository> cartRepository = new Mock<IShoppingCartRepository>(MockBehavior.Strict);
            Mock<IShoppingCartItemRepository> cartItemRepository = new Mock<IShoppingCartItemRepository>(MockBehavior.Strict);

            var orderService = new ca_service.Services.OrderService(orderRepository.Object, orderItemRepository.Object, cartRepository.Object, cartItemRepository.Object);

            int shoppingCartId = 33, userId = 99, productId = 42, otherUserId = 102;

            OrderPaymentMethod paymentMethod = OrderPaymentMethod.CaliforniaDepartmentofEducation;

            ShoppingCart theCart = new ShoppingCart(shoppingCartId)
            {
                Items = new List<ShoppingCartItem>(),
                UserId = userId
            };

            cartRepository.Setup(x => x.Get(shoppingCartId)).Returns(() => theCart);

            ShoppingCartItem theItem = new ShoppingCartItem()
            {
                ShoppingCartId = shoppingCartId,
                ProductId = productId,
                Quantity = 1,
                Price = 25.00m,
            };

            string address1 = "", address2 = "", address3 = "", city = "", state = "", zip = "", email = "";

            Assert.Throws<Exception>(() => orderService.Create(shoppingCartId, otherUserId, paymentMethod, address1, address2, address3, city, state, zip, email));

            orderRepository.VerifyAll();
            orderItemRepository.VerifyAll();
            cartRepository.VerifyAll();
            cartItemRepository.VerifyAll();
        }

        [Fact]
        public void PlaceOrderThrowsExceptionIfNoShoppingCartOrItems()
        {
            Mock<IOrderRepository> orderRepository = new Mock<IOrderRepository>(MockBehavior.Strict);
            Mock<IOrderItemRepository> orderItemRepository = new Mock<IOrderItemRepository>(MockBehavior.Strict);
            Mock<IShoppingCartRepository> cartRepository = new Mock<IShoppingCartRepository>(MockBehavior.Strict);
            Mock<IShoppingCartItemRepository> cartItemRepository = new Mock<IShoppingCartItemRepository>(MockBehavior.Strict);

            var orderService = new ca_service.Services.OrderService(orderRepository.Object, orderItemRepository.Object, cartRepository.Object, cartItemRepository.Object);

            int shoppingCartId = 33, userId = 99, productId = 42;

            ShoppingCart theCart = null;

            cartRepository.Setup(x => x.Get(shoppingCartId)).Returns(() => theCart);

            string address1 = "", address2 = "", address3 = "", city = "", state = "", zip = "", email = "";

            Assert.Throws<Exception>(() => orderService.Create(shoppingCartId, userId, OrderPaymentMethod.CaliforniaDepartmentofEducation, address1, address2, address3, city, state, zip, email));

            theCart = new ShoppingCart(shoppingCartId)
            {
                Items = new List<ShoppingCartItem>(),
                UserId = userId
            };

            ShoppingCartItem theItem = new ShoppingCartItem()
            {
                ShoppingCartId = shoppingCartId,
                ProductId = productId,
                Quantity = 1,
                Price = 25.00m,
            };

            List<ShoppingCartItem> cartItems = null;

            cartItemRepository.Setup(x => x.Fetch(shoppingCartId)).Returns(() => cartItems);

            Assert.Throws<Exception>(() => orderService.Create(shoppingCartId, userId, OrderPaymentMethod.CaliforniaDepartmentofEducation, address1, address2, address3, city, state, zip, email));

            orderRepository.VerifyAll();
            orderItemRepository.VerifyAll();
            cartRepository.VerifyAll();
            cartItemRepository.VerifyAll();
        }

        [Fact]
        public void CancelOrderSetsOrderStatusToCancelled()
        {
            Mock<IOrderRepository> orderRepository = new Mock<IOrderRepository>(MockBehavior.Strict);

            var orderService = new ca_service.Services.OrderService(orderRepository.Object, null, null, null);

            int orderId = 42, userId = 9;

            Order theOrder = new Order(orderId) { Status = OrderStatus.Placed, UserId = userId };

            orderRepository.Setup(x => x.Get(orderId)).Returns(() => theOrder);
            orderRepository.Setup(x => x.Update(It.IsAny<Order>()));

            var result = orderService.CancelOrder(orderId, userId);

            Assert.Equal(OrderStatus.UserCancelled, result.Status);

            orderRepository.VerifyAll();
        }

        [Fact]
        public void CancelOrderThrowsExceptionIfNoOrderOrWrongUser()
        {
            Mock<IOrderRepository> orderRepository = new Mock<IOrderRepository>(MockBehavior.Strict);

            var orderService = new ca_service.Services.OrderService(orderRepository.Object, null, null, null);

            int orderId = 42, userId = 9, wrongUserId = 99;

            Order theOrder = null;

            orderRepository.Setup(x => x.Get(orderId)).Returns(() => theOrder);

            Order result;

            Assert.Throws<Exception>(() => result = orderService.CancelOrder(orderId, userId));

            theOrder = new Order(orderId) { Status = OrderStatus.Placed, UserId = userId };

            Assert.Throws<Exception>(() => result = orderService.CancelOrder(orderId, wrongUserId));
        }

        [Fact]
        public void GetOrderReturnsNullIfNoOrder()
        {
            Mock<IOrderRepository> orderRepository = new Mock<IOrderRepository>(MockBehavior.Strict);

            var orderService = new ca_service.Services.OrderService(orderRepository.Object, null, null, null);

            int orderId = 42;

            orderRepository.Setup(x => x.Get(orderId)).Returns(() => null);

            var result = orderService.Get(orderId);

            Assert.Null(result);

            orderRepository.VerifyAll();
        }

        [Fact]
        public void GetOrderReturnsOrderAndItems()
        {
            Mock<IOrderRepository> orderRepository = new Mock<IOrderRepository>(MockBehavior.Strict);

            Mock<IOrderItemRepository> orderItemRepository = new Mock<IOrderItemRepository>(MockBehavior.Strict);

            var orderService = new ca_service.Services.OrderService(orderRepository.Object, orderItemRepository.Object, null, null);

            int orderId = 42, orderItemId = 84;

            var order = new Order(orderId);

            var orderItem = new OrderItem(orderItemId);

            var orderItems = new List<OrderItem>() { orderItem };

            orderRepository.Setup(x => x.Get(orderId)).Returns(() => order);

            orderItemRepository.Setup(x => x.GetByOrderId(orderId)).Returns(() => orderItems);

            var result = orderService.Get(orderId);

            Assert.NotNull(result);

            Assert.Equal(orderId, result.Id);

            Assert.Equal(orderItems.Count, result.Items.Count);

            Assert.Equal(orderItemId, result.Items.First().Id);

            orderRepository.VerifyAll();
            orderItemRepository.VerifyAll();
        }

        [Fact]
        public void GetOrdersByUserReturnsEmptyListWithNoOrders()
        {
            Mock<IOrderRepository> orderRepository = new Mock<IOrderRepository>(MockBehavior.Strict);

            var orderService = new ca_service.Services.OrderService(orderRepository.Object, null, null, null);

            int userId = 12;

            orderRepository.Setup(x => x.GetOrdersForUser(userId)).Returns(() => new List<Order>());

            var result = orderService.GetOrdersForUser(userId);

            Assert.Equal(0, result.Count);

            orderRepository.VerifyAll();
        }

        [Fact]
        public void GetOrdersByUserReturnOrders()
        {
            Mock<IOrderRepository> orderRepository = new Mock<IOrderRepository>(MockBehavior.Strict);

            Mock<IOrderItemRepository> orderItemRepository = new Mock<IOrderItemRepository>(MockBehavior.Strict);

            var orderService = new ca_service.Services.OrderService(orderRepository.Object, orderItemRepository.Object, null, null);

            int orderId = 42, orderItemId = 84, userId = 12;

            var order = new Order(orderId) { UserId = userId };

            var orderItem = new OrderItem(orderItemId) { OrderId = orderId };

            var orderItems = new List<OrderItem>() { orderItem };

            var orders = new List<Order>() { order };

            orderRepository.Setup(x => x.GetOrdersForUser(userId)).Returns(() => orders);

            orderItemRepository.Setup(x => x.GetByOrderId(orderId)).Returns(() => orderItems);

            var result = orderService.GetOrdersForUser(userId);

            Assert.NotNull(result);

            Assert.Equal(orders.Count, result.Count);

            Assert.Equal(orderId, result.First().Id);

            Assert.Equal(orderItemId, result.First().Items.First().Id);

            orderRepository.VerifyAll();
            orderItemRepository.VerifyAll();
        }
    }
}

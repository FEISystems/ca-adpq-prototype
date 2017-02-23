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
        public void CancelOrderSetsOrderStatusToCancelled()
        {
            Moq.Mock<IOrderRepository> orderRepository = new Moq.Mock<IOrderRepository>(Moq.MockBehavior.Strict);

            var orderService = new ca_service.Services.OrderService(orderRepository.Object, null);

            int orderId = 42;

            Order theOrder = new Order(orderId) { Status = OrderStatus.Placed };

            orderRepository.Setup(x => x.Get(orderId)).Returns(() => theOrder);
            orderRepository.Setup(x => x.Update(It.IsAny<Order>()));

            var result = orderService.CancelOrder(orderId);

            Assert.Equal(OrderStatus.UserCancelled, result.Status);

            orderRepository.VerifyAll();
        }

        [Fact]
        public void CancelOrderThrowsExceptionIfNoOrder()
        {
            Moq.Mock<IOrderRepository> orderRepository = new Moq.Mock<IOrderRepository>(Moq.MockBehavior.Strict);

            var orderService = new ca_service.Services.OrderService(orderRepository.Object, null);

            int orderId = 42;

            orderRepository.Setup(x => x.Get(orderId)).Returns(() => null);

            Order result;

            Assert.Throws<Exception>(() => result = orderService.CancelOrder(orderId));
        }

        [Fact]
        public void GetOrderReturnsNullIfNoOrder()
        {
            Moq.Mock<IOrderRepository> orderRepository = new Moq.Mock<IOrderRepository>(Moq.MockBehavior.Strict);

            var orderService = new ca_service.Services.OrderService(orderRepository.Object, null);

            int orderId = 42;

            orderRepository.Setup(x => x.Get(orderId)).Returns(() => null);

            var result = orderService.Get(orderId);

            Assert.Null(result);

            orderRepository.VerifyAll();
        }

        [Fact]
        public void GetOrderReturnsOrderAndItems()
        {
            Moq.Mock<IOrderRepository> orderRepository = new Moq.Mock<IOrderRepository>(Moq.MockBehavior.Strict);

            Moq.Mock<IOrderItemRepository> orderItemRepository = new Moq.Mock<IOrderItemRepository>(Moq.MockBehavior.Strict);

            var orderService = new ca_service.Services.OrderService(orderRepository.Object, orderItemRepository.Object);

            int orderId = 42, orderItemId = 84;

            var order = new Order(orderId);

            var orderItem = new OrderItem(orderItemId);

            var orderItems = new List<OrderItem>() { orderItem };

            orderRepository.Setup(x => x.Get(orderId)).Returns(() => order);

            orderItemRepository.Setup(x => x.GetByOrderId(orderId)).Returns(() => orderItems);

            var result = orderService.Get(orderId);

            Assert.NotNull(result);

            Assert.Equal<int>(orderId, result.Id);

            Assert.Equal<int>(orderItems.Count, result.Items.Count);

            Assert.Equal<int>(orderItemId, result.Items.First().Id);

            orderRepository.VerifyAll();
            orderItemRepository.VerifyAll();
        }

        [Fact]
        public void GetOrdersByUserReturnsEmptyListWithNoOrders()
        {
            Moq.Mock<IOrderRepository> orderRepository = new Moq.Mock<IOrderRepository>(Moq.MockBehavior.Strict);

            var orderService = new ca_service.Services.OrderService(orderRepository.Object, null);

            int userId = 12;

            orderRepository.Setup(x => x.GetOrdersForUser(userId)).Returns(() => new List<Order>());

            var result = orderService.GetOrdersForUser(userId);

            Assert.Equal(0, result.Count);

            orderRepository.VerifyAll();
        }

        [Fact]
        public void GetOrdersByUserReturnOrders()
        {
            Moq.Mock<IOrderRepository> orderRepository = new Moq.Mock<IOrderRepository>(Moq.MockBehavior.Strict);

            Moq.Mock<IOrderItemRepository> orderItemRepository = new Moq.Mock<IOrderItemRepository>(Moq.MockBehavior.Strict);

            var orderService = new ca_service.Services.OrderService(orderRepository.Object, orderItemRepository.Object);

            int orderId = 42, orderItemId = 84, userId = 12;

            var order = new Order(orderId) { UserId = userId };

            var orderItem = new OrderItem(orderItemId) { OrderId = orderId };

            var orderItems = new List<OrderItem>() { orderItem };

            var orders = new List<Order>() { order };

            orderRepository.Setup(x => x.GetOrdersForUser(userId)).Returns(() => orders);

            orderItemRepository.Setup(x => x.GetByOrderId(orderId)).Returns(() => orderItems);

            var result = orderService.GetOrdersForUser(userId);

            Assert.NotNull(result);

            Assert.Equal<int>(orders.Count, result.Count);

            Assert.Equal<int>(orderId, result.First().Id);

            Assert.Equal<int>(orderItemId, result.First().Items.First().Id);

            orderRepository.VerifyAll();
            orderItemRepository.VerifyAll();
        }
    }
}

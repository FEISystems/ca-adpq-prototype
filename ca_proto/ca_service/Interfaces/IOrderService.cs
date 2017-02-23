using ca_service.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ca_service.Interfaces
{
    public interface IOrderService
    {
        Order Create(int shoppingCartId, int userId, OrderPaymentMethod paymentMethod);

        Order Get(int id);

        List<Order> GetOrdersForUser(int userId);

        Order CancelOrder(int orderId);
    }
}

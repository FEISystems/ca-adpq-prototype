using ca_service.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ca_service.Interfaces
{
    public interface IOrderItemRepository : IEntityRepository, IDisposable
    {
        void Add(OrderItem orderItem);

        OrderItem Get(int id);

        List<OrderItem> GetByOrderId(int orderId);
    }
}

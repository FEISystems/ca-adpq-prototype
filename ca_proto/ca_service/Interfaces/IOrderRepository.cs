using ca_service.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ca_service.Interfaces
{
    public interface IOrderRepository : IDisposable
    {
        void Add(Order order);

        void Update(Order order);

        Order Get(int id);

        List<Order> GetOrdersForUser(int userId);
    }
}

using ca_service.Entities;
using ca_service.Interfaces;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ca_service.Repositories
{
    public class OrderItemRepository : EntityRepository<OrderItem>, IOrderItemRepository
    {
        public OrderItemRepository(IConfiguration configuration)
            : base(configuration)
        {
        }

        public List<OrderItem> GetByOrderId(int orderId)
        {
            var filter = new Dictionary<string, object>();
            filter.Add("OrderId", orderId);

            return base.Fetch(0, 100, filter).ToList();
        }
    }
}

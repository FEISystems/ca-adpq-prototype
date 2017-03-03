using ca_service.Entities;
using ca_service.Interfaces;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ca_service.Repositories
{
    public class OrderRepository : EntityRepository<Order>, IOrderRepository
    {
        public OrderRepository(IConfiguration configuration)
            : base(configuration)
        {
        }

        public List<Order> GetOrdersForUser(int userId)
        {
            var filter = new Dictionary<string, object>();

            filter.Add("UserId", userId);

            var result = base.Fetch(0, 100, filter);

            return result?.ToList() ?? new List<Order>();
        }
    }
}

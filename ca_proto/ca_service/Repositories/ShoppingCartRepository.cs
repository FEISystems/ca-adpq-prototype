using ca_service.Entities;
using ca_service.Interfaces;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ca_service.Repositories
{
    public class ShoppingCartRepository : EntityRepository<ShoppingCart>, IShoppingCartRepository
    {
        public ShoppingCartRepository(IConfiguration configuration)
            : base(configuration)
        {
        }

        public List<ShoppingCart> Fetch(int userId)
        {
            this.OrderAscending = true;
            this.OrderColumnName = "CreateDate";
            var filter = new Dictionary<string, object>();
            filter.Add("UserId", userId);
            return base.Fetch(0, int.MaxValue, filter)?.ToList();
        }        
    }
}

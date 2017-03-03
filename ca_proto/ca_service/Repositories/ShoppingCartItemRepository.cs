using ca_service.Entities;
using ca_service.Interfaces;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ca_service.Repositories
{
    public class ShoppingCartItemRepository : EntityRepository<ShoppingCartItem>, IShoppingCartItemRepository
    {
        public ShoppingCartItemRepository(IConfiguration configuration)
            : base(configuration)
        {
        }

        public List<ShoppingCartItem> Fetch(int shoppingCartId)
        {
            this.OrderAscending = true;
            var filter = new Dictionary<string, object>();
            filter.Add("ShoppingCartId", shoppingCartId);
            return base.Fetch(0, int.MaxValue, filter).ToList();
        }
    }
}

using ca_service.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ca_service.Interfaces
{
    public interface IShoppingCartItemRepository : IEntityRepository, IDisposable
    {
        void Add(ShoppingCartItem item);
        void Update(ShoppingCartItem item);
        ShoppingCartItem Get(int id);
        List<ShoppingCartItem> Fetch(int shoppingCartId);
    }
}

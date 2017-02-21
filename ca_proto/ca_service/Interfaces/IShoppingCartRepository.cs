using ca_service.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ca_service.Interfaces
{
    public interface IShoppingCartRepository:IDisposable
    {
        void Add(ShoppingCart cart);
        void Update(ShoppingCart cart);
        void Delete(int id);
        ShoppingCart Get(int id);
        List<ShoppingCart> Fetch(int userId);
    }
}

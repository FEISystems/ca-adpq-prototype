using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ca_service.Entities;
namespace ca_service.Interfaces
{
    public interface IShoppingCartService
    {
        ShoppingCart GetCart(int shoppingCartId);
        ShoppingCart AddItemToCart(int productId, int userId);
        ShoppingCart RemoveItemFromCart(int productId, int userId);
        void ClearShoppingCart(int shoppingCartId);
    }
}

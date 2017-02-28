using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ca_service.Entities;
namespace ca_service.Interfaces
{
    public interface IShoppingCartService
    {
        ShoppingCart GetActiveCart(int userId);
        ShoppingCart GetCart(int shoppingCartId);
        List<ShoppingCart> GetCarts(int userId);
        ShoppingCart AddItemToCart(int productId, int quantity, int userId);
        ShoppingCart UpdateItem(int shoppingCartItemId, int quantity, int userId);

        ShoppingCart RemoveItemFromCart(int shoppingCartItemId, int userId);
        ShoppingCart ClearShoppingCart(int userId);

        void DeactivateCart(int userId);

        ShoppingCart CompleteCart(int userId);
    }
}

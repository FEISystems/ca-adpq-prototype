using ca_service.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ca_service.Entities;
namespace ca_service.Services
{
    public class ShoppingCartService : IShoppingCartService
    {
        private readonly IShoppingCartRepository shoppingCartRepository;
        private readonly IShoppingCartItemRepository shoppingCartItemRepository;
        private readonly IInventoryRepository inventoryRepository;
        public ShoppingCartService(IShoppingCartRepository shoppingCartRepository, 
            IShoppingCartItemRepository shoppingCartItemRepository, IInventoryRepository inventoryRepository)
        {
            this.shoppingCartItemRepository = shoppingCartItemRepository;
            this.shoppingCartRepository = shoppingCartRepository;
            this.inventoryRepository = inventoryRepository;
        }

        public ShoppingCart GetCart(int shoppingCartId)
        {
            var cart = shoppingCartRepository.Get(shoppingCartId);
            cart.Items = shoppingCartItemRepository.Fetch(shoppingCartId);
            cart.Total = cart.Items.Sum(x => x.Price);
            return cart;
        }

        public ShoppingCart AddItemToCart(int productId, int userId)
        {
            int? shoppingCartId = null; //TODO: Get current cart
            ShoppingCart cart;
            if (!shoppingCartId.HasValue)
            {
                cart = new ShoppingCart()
                {
                    CreateDate = DateTime.Now,
                    UserId = userId
                };
                shoppingCartRepository.Add(cart);

            }
            else
            {
                cart = shoppingCartRepository.Get(shoppingCartId.Value);
            }

            Product product = this.inventoryRepository.Get(productId);
            if (product == null)
                throw new Exception($"A product with id {productId} was not found");
            shoppingCartItemRepository.Add(new ShoppingCartItem() {
                Price = product.ContractPrice,
                Description = product.Description,
                ProductId = product.Id,
                Quantity = 1,
                ShoppingCartId = cart.Id
            });
            
            cart.Items = shoppingCartItemRepository.Fetch(cart.Id);
            return cart;
        }

        public void ClearShoppingCart(int shoppingCartId)
        {
            //todo
        }
               

        public ShoppingCart RemoveItemFromCart(int productId, int userId)
        {
            throw new NotImplementedException();
        }
    }
}

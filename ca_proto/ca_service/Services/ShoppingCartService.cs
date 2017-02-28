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
            return cart;
        }

        public List<ShoppingCart> GetCarts(int userId)
        {
            var carts = shoppingCartRepository.Fetch(userId);
            if (carts != null && carts.Any())
                foreach (var cart in carts)
                {
                    cart.Items = shoppingCartItemRepository.Fetch(cart.Id);
                }
            return carts;
        }

        public ShoppingCart GetActiveCart(int userId)
        {
            ShoppingCart cart = null;

            var allCarts = shoppingCartRepository.Fetch(userId);
            if (allCarts != null && allCarts.Any())
                cart = allCarts.OrderByDescending(x => x.CreateDate).FirstOrDefault(x => x.Status == ShoppingCartStatus.Active);
            if (cart != null)
                cart.Items = shoppingCartItemRepository.Fetch(cart.Id);
            return cart;
        }

        public ShoppingCart AddItemToCart(int productId, int quantity, int userId)
        {
            if (quantity < 1)
                throw new Exception("Quantity cannot be less than one");
            ShoppingCart cart = GetActiveCart(userId);
            if (cart == null)
            {
                cart = new ShoppingCart()
                {
                    CreateDate = DateTime.Now,
                    UserId = userId,
                    Status = ShoppingCartStatus.Active
                };
                shoppingCartRepository.Add(cart);

            }


            Product product = this.inventoryRepository.Get(productId);
            if (product == null)
                throw new Exception($"A product with id {productId} was not found");

            if (cart.Items != null && cart.Items.Any(x => x.ProductId == productId))
            {
                var item = cart.Items.First(x => x.ProductId == productId);
                item.Quantity += quantity;
                shoppingCartItemRepository.Update(item);
            }
            else
                shoppingCartItemRepository.Add(new ShoppingCartItem()
                {
                    Price = product.ContractPrice,
                    Description = product.Description,
                    ProductId = product.Id,
                    Quantity = quantity,
                    ShoppingCartId = cart.Id
                });

            cart.Items = shoppingCartItemRepository.Fetch(cart.Id);
            return cart;
        }

        public ShoppingCart UpdateItem(int shoppingCartItemId, int quantity, int userId)
        {
            if (quantity < 0)
                throw new Exception("Quantity cannot be less than zero");
            ShoppingCartItem item = shoppingCartItemRepository.Get(shoppingCartItemId);
            if (item == null)
                throw new Exception($"Item with id {shoppingCartItemId} was not found");

            if (quantity == 0)
            {
                shoppingCartItemRepository.Delete(item.Id);
            }
            else
            {
                item.Quantity = quantity;
                shoppingCartItemRepository.Update(item);
            }
            return GetCart(item.ShoppingCartId);
        }


        public ShoppingCart ClearShoppingCart(int userId)
        {
            ShoppingCart cart = GetActiveCart(userId);
            if (cart == null || cart.Items == null || !cart.Items.Any())
                return cart;
            foreach (var item in cart.Items)
                shoppingCartItemRepository.Delete(item.Id);
            return cart;
        }

        public ShoppingCart RemoveItemFromCart(int shoppingCartItemId, int userId)
        {
            ShoppingCart cart = GetActiveCart(userId);
            if (cart == null || cart.Items == null || !cart.Items.Any() || !cart.Items.Any(x => x.Id == shoppingCartItemId))
                return cart;
            shoppingCartItemRepository.Delete(shoppingCartItemId);
            return GetCart(cart.Id);
        }

        public void DeactivateCart(int userId)
        {
            ShoppingCart cart = GetActiveCart(userId);
            if (cart == null)
                return;
            cart.Status = ShoppingCartStatus.Deactivated;
            shoppingCartRepository.Update(cart);
        }

        public ShoppingCart CompleteCart(int userId)
        {
            //TODO: Need to add the payment logic
            ShoppingCart cart = GetActiveCart(userId);
            if (cart == null)
                return cart;
            cart.Status = ShoppingCartStatus.Complete;
            shoppingCartRepository.Update(cart);
            return cart;
        }

        #region IDisposable Support

        private bool disposedValue = false; // To detect redundant calls

        protected virtual void Dispose(bool disposing)
        {
            if (!disposedValue)
            {
                if (disposing)
                {
                    // TODO: dispose managed state (managed objects).
                    if (shoppingCartRepository != null)
                        shoppingCartRepository.Dispose();

                    if (shoppingCartItemRepository != null)
                        shoppingCartItemRepository.Dispose();

                    if (inventoryRepository != null)
                        inventoryRepository.Dispose();
                }

                // TODO: free unmanaged resources (unmanaged objects) and override a finalizer below.
                // TODO: set large fields to null.

                disposedValue = true;
            }
        }

        // This code added to correctly implement the disposable pattern.
        public void Dispose()
        {
            // Do not change this code. Put cleanup code in Dispose(bool disposing) above.
            Dispose(true);
        }

        #endregion
    }
}

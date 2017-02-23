using ca_service.Interfaces;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Reflection;
using ca_service.Repositories;
using System.Text;

namespace ca_service.Services
{
    public class PrototypeService:IPrototypeService
    {
        private readonly ICategoryRepository categoryRepository;
        private readonly IContractorRepository contractorRepository;
        private readonly IContractRepository contractRepository;
        private readonly IImageRepository imageRepository;
        private readonly IInventoryRepository inventoryRepository;
        private readonly IOrderItemRepository orderItemRepository;
        private readonly IOrderRepository orderRepository;
        private readonly IShoppingCartItemRepository shoppingCartItemRepository;
        private readonly IShoppingCartRepository shoppingCartRepository;

        public PrototypeService(ICategoryRepository categoryRepository,
            IContractorRepository contractorRepository, IContractRepository contractRepository,
            IImageRepository imageRepository, IInventoryRepository inventoryRepository,
            IOrderItemRepository orderItemRepository, IOrderRepository orderRepository,
            IShoppingCartItemRepository shoppingCartItemRepository, IShoppingCartRepository shoppingCartRepository)
        {
            this.categoryRepository = categoryRepository;
            this.contractorRepository = contractorRepository;
            this.contractRepository = contractRepository;
            this.imageRepository = imageRepository;
            this.inventoryRepository = inventoryRepository;
            this.orderItemRepository = orderItemRepository;
            this.orderRepository = orderRepository;
            this.shoppingCartItemRepository = shoppingCartItemRepository;
            this.shoppingCartRepository = shoppingCartRepository;
        }

        public string DeleteAllEntities()
        {
            StringBuilder result = new StringBuilder();
            result.AppendFormat("Deleted {0} categories\r\n", categoryRepository.DeleteAll());
            result.AppendFormat("Deleted {0} contractors\r\n", contractorRepository.DeleteAll());
            result.AppendFormat("Deleted {0} contracts\r\n", contractRepository.DeleteAll());
            result.AppendFormat("Deleted {0} images\r\n", imageRepository.DeleteAll());
            result.AppendFormat("Deleted {0} products\r\n", inventoryRepository.DeleteAll());
            result.AppendFormat("Deleted {0} order items\r\n", orderItemRepository.DeleteAll());
            result.AppendFormat("Deleted {0} orders\r\n", orderRepository.DeleteAll());
            result.AppendFormat("Deleted {0} shopping cart items\r\n", shoppingCartItemRepository.DeleteAll());
            result.AppendFormat("Deleted {0} shopping carts\r\n", shoppingCartRepository.DeleteAll());
            return result.ToString();
        }
    }
}

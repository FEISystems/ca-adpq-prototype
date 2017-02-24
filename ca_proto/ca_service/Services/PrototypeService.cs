using ca_service.Interfaces;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Reflection;
using ca_service.Repositories;
using System.Text;
using ca_service.Entities;

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
        private readonly IUserRepository userRepository;

        public PrototypeService(ICategoryRepository categoryRepository,
            IContractorRepository contractorRepository, IContractRepository contractRepository,
            IImageRepository imageRepository, IInventoryRepository inventoryRepository,
            IOrderItemRepository orderItemRepository, IOrderRepository orderRepository,
            IShoppingCartItemRepository shoppingCartItemRepository, IShoppingCartRepository shoppingCartRepository,
            IUserRepository userRepository)
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
            this.userRepository = userRepository;
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

        public string GenerateOrders(int count)
        {
            var products = inventoryRepository.Fetch(0, int.MaxValue);
            if (null == products || products.Count == 0)
                return "Products must first be added to the catalog.";
            var contractors = contractorRepository.Fetch(0, int.MaxValue);
            if (null == contractors || contractors.Count == 0)
                return "Products with Contractors must first be added to the catalog.";
            var users = userRepository.GetUsers();
            if (null == users || users.Count == 0)
                return "Users must first be added to the system.";
            Random random = new Random((int)DateTime.Now.Ticks);
            StringBuilder result = new StringBuilder();
            int orderCount = 0;
            int orderItemCount = 0;
            HashSet<int> includedItems = new HashSet<int>();
            for (int i=0; i<count; i++)
            {
                orderCount++;
                int itemCount = random.Next(10) + 1;
                Order order = BuildRandomOrder(random, users);
                orderRepository.Add(order);
                includedItems.Clear();
                for (int j = 0; j<itemCount; j++)
                {
                    orderItemCount++;
                    var product = GetNextProduct(products, random, includedItems);
                    OrderItem item = new OrderItem();
                    item.OrderId = order.Id;
                    item.Price = product.ContractPrice;
                    item.ProductId = product.Id;
                    item.Quantity = 1 + random.Next(6);
                    orderItemRepository.Add(item);
                }
            }
            result.AppendFormat("Added {0} orders\r\n", orderCount);
            result.AppendFormat("Added {0} order items\r\n", orderItemCount);
            return result.ToString();
        }

        private Product GetNextProduct(List<Product> products, Random random, HashSet<int> includedItems)
        {
            while (true)
            {
                int index = random.Next(products.Count);
                if (includedItems.Contains(index))
                    continue;
                includedItems.Add(index);
                return products[index];
            }
        }

        private static readonly string[] Streets = { "Main", "Market", "Front", "Second", "Third", "Fourth" };
        private static readonly string[] Cities = { "Lexington", "Annapolis", "Frankfurt", "Wilmington", "Phoenix", "Fairfax", "Portland", "Ontario" };
        private static readonly string[] States = { "MD", "VA", "CA", "AZ", "VT", "GA" };
        private static readonly string[] UserFirstNames = { "Karen", "David", "John", "Jonathan", "Douglas", "Claire", "Juliette", "Terry", "Kevin" };
        private static readonly string[] UserLastNames = { "Smith", "Brown", "Jones", "Lee", "Johnson" };
        private static readonly string[] EmailServices = { "gmail", "hotmail", "yahoo", "apple", "me" };

        private Order BuildRandomOrder(Random random, List<User> users)
        {
            var result = new Order(0);
            result.Address1 = BuildRandomAddress(random);
            result.Address2 = GetApartment(random.Next(10));
            result.Address3 = "";
            result.City = Cities[random.Next(Cities.Length)];
            result.EmailAddress = string.Format("{0}.{1}@{2}.com",
                UserFirstNames[random.Next(UserFirstNames.Length)],
                UserLastNames[random.Next(UserLastNames.Length)],
                EmailServices[random.Next(EmailServices.Length)]);
            result.CreateDate = DateTime.UtcNow.AddYears(-2).AddDays(random.Next(730));
            result.PaymentMethod = (OrderPaymentMethod)(1 + random.Next(4));
            result.PostalCode = random.Next(99999).ToString().PadLeft(5, '0');
            result.State = States[random.Next(States.Length)];
            result.Status = (OrderStatus)(1 + random.Next(3));
            result.UserId = users[random.Next(users.Count)].Id;
            return result;
        }

        private string GetApartment(int value)
        {
            return value == 0 ? "" : "Apt " + ((char)('A' + (value - 1))).ToString();
        }

        private string BuildRandomAddress(Random random)
        {
            int streetIndex = random.Next(20);
            var streetName = streetIndex < Streets.Length ? Streets[streetIndex] : streetIndex.ToString() + "th";
            return string.Format("{0}{1} {2} St", 1 + random.Next(10), 10 + random.Next(90), streetName);
        }
    }
}

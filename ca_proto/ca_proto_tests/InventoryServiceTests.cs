using ca_service.Entities;
using ca_service.Interfaces;
using Moq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Xunit;

namespace ca_proto_tests
{
    public class InventoryServiceTests
    {
        public InventoryServiceTests()
        {
        }

        [Fact]
        public void QuickSearchWithNoTermsReturnsNull()
        {
            var inventoryRepository = new Mock<IInventoryRepository>(MockBehavior.Strict);
            var categoryRepository = new Mock<ICategoryRepository>(MockBehavior.Strict);
            var contractRepository = new Mock<IContractRepository>(MockBehavior.Strict);
            var contractorRepository = new Mock<IContractorRepository>(MockBehavior.Strict);

            var inventoryService = new ca_service.Services.InventoryService(inventoryRepository.Object, categoryRepository.Object, contractRepository.Object, contractorRepository.Object);

            string[] searchTerms = null;

            var result = inventoryService.QuickSearch(searchTerms);

            Assert.Null(result);

            searchTerms = new string[0];

            result = inventoryService.QuickSearch(searchTerms);

            Assert.Null(result);

            inventoryRepository.VerifyAll();
            categoryRepository.VerifyAll();
            contractRepository.VerifyAll();
            contractorRepository.VerifyAll();
        }

        [Fact]
        public void QuickSearchWithTermsReturnsProduct()
        {
            var inventoryRepository = new Mock<IInventoryRepository>(MockBehavior.Strict);
            var categoryRepository = new Mock<ICategoryRepository>(MockBehavior.Strict);
            var contractRepository = new Mock<IContractRepository>(MockBehavior.Strict);
            var contractorRepository = new Mock<IContractorRepository>(MockBehavior.Strict);

            var inventoryService = new ca_service.Services.InventoryService(inventoryRepository.Object, categoryRepository.Object, contractRepository.Object, contractorRepository.Object);

            string[] searchTerms = new string[] { "foo" };

            var product = new Product(1);

            var products = new List<Product>() { product };

            inventoryRepository.Setup(x => x.QuickSearch(searchTerms)).Returns(() => products);

            var result = inventoryService.QuickSearch(searchTerms);

            Assert.Equal(products.Count, result.Count);

            Assert.Equal(product.Id, result.First().Id);

            inventoryRepository.VerifyAll();
            categoryRepository.VerifyAll();
            contractRepository.VerifyAll();
            contractorRepository.VerifyAll();
        }
    }
}

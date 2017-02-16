using ca_service.Database;
using ca_service.Entities;
using ca_service.Interfaces;
using Microsoft.Extensions.Configuration;
using MySql.Data.MySqlClient;
using System;
using System.Collections.Generic;

namespace ca_service.Services
{
    public class InventoryService: IInventoryService, IDisposable
    {
        private readonly IInventoryRepository inventoryRepository;

        public InventoryService(IInventoryRepository inventoryRepository)
        {
            this.inventoryRepository = inventoryRepository;
        }

        public void Dispose()
        {
            if (inventoryRepository != null)
                inventoryRepository.Dispose();
        }

        public IEnumerable<Product> QuickSearch(string[] searchTerms)
        {
            if (searchTerms == null || searchTerms.Length == 0)
                return null;

            var result = inventoryRepository.QuickSearch(searchTerms);

            return result;
        }

        public void Add(Product product)
        {
            if (null == product)
                throw new Exception("A product must be provided");
            inventoryRepository.Add(product);
        }

        public void Update(Product product)
        {
            if (null == product)
                return;
            inventoryRepository.Update(product);
        }

        public void Import(string fileContent)
        {
            if (string.IsNullOrWhiteSpace(fileContent))
                return;
            inventoryRepository.Import(fileContent);
        }

        public Product Get(int id)
        {
            return inventoryRepository.Get(id);
        }

        public void Delete(int id)
        {
            inventoryRepository.Delete(id);
        }

        public IEnumerable<Product> Fetch()
        {
            return inventoryRepository.Fetch();
        }

    }
}

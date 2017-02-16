using ca_service.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ca_service.Interfaces
{
    public interface IInventoryRepository : IDisposable
    {
        List<Product> QuickSearch(string[] searchTerms);
        void Add(Product product);
        void Update(Product product);
        void Import(string fileContent);
        Product Get(int id);
        void Delete(int id);
    }
}

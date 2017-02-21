using ca_service.Database;
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
        Product Get(int id);
        void Delete(int id);
        List<Product> Fetch(int start, int count);
        string OrderColumnName { get; set; }
        bool OrderAscending { get; set; }

        IEnumerable<Product> Where(Product product, params string[] columnNames);
        IEnumerable<Product> Fetch(int start, int count, IDictionary<string, object> filter);
        int Count(IDictionary<string, object> filter);
        IEnumerable<Product> FetchByCategories(int start, int count, string[] categories);
    }
}

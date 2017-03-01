using ca_service.Database;
using ca_service.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ca_service.Interfaces
{
    public interface IInventoryRepository : IEntityRepository
    {
        List<Product> AdvancedSearch(string name, string category, decimal? minPrice, decimal? maxPrice, string manufacturer, string manufacturerPartNumber, string sku);

        List<Product> QuickSearch(string[] searchTerms);
        void Add(Product product);
        void Update(Product product);
        Product Get(int id);
        List<Product> Fetch(int start, int count);

        IEnumerable<Product> Where(Product product, params string[] columnNames);
        IEnumerable<Product> Fetch(int start, int count, IDictionary<string, object> filter);
        int Count(IDictionary<string, object> filter);
        List<string> GetManufacturerNames();
    }
}

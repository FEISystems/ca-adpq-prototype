using ca_service.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ca_service.Interfaces
{
    public interface IInventoryService
    {
        /// <summary>
        /// Retrieves a list of products based on a list of search criteria. Returns null if <paramref name="searchTerms"/> is null or empty.
        /// </summary>
        /// <param name="searchTerms"></param>
        /// <returns>A list of <seealso cref="Product"/> objects, or null if <paramref name="searchTerms"/> is null or empty.</returns>
        List<Product> QuickSearch(string[] searchTerms);
        void Add(Product product);

        void Update(Product product);
        string Import(string fileContent);
        Product Get(int id);
        void Delete(int id);
        IEnumerable<Product> Fetch(int start, int count, IDictionary<string, object> filter);
        string OrderColumnName { get; set; }
        bool OrderAscending { get; set; }
        int Count(IDictionary<string, object> filter);
    }
}

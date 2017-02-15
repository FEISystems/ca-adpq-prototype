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
    }
}

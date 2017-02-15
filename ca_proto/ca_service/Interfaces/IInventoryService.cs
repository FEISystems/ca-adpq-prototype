using ca_service.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ca_service.Interfaces
{
    public interface IInventoryService
    {
        IEnumerable<Product> QuickSearch(string[] searchTerms);
    }
}

using ca_service.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ca_service.Interfaces
{
    public interface ICategoryRepository:IDisposable
    {
        void Add(Category product);
        void Update(Category product);
        void Delete(int id);
        Category Get(int id);
        List<Category> Fetch();
    }
}

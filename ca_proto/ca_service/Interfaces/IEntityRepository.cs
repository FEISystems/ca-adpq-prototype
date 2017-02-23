using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ca_service.Interfaces
{
    public interface IEntityRepository
    {
        void Delete(int Id);
        int DeleteAll();
        string OrderColumnName { get; set; }
        bool OrderAscending { get; set; }
    }
}

using ca_service.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ca_service.Interfaces
{
    public interface IContractorService
    {
        void Add(Contractor contractor);
        void Update(Contractor contractor);
        Contractor Get(int id);
        void Delete(int id);
        IEnumerable<Contractor> Fetch(int start, int count);
        string OrderColumnName { get; set; }
        bool OrderAscending { get; set; }
    }
}

using ca_service.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ca_service.Interfaces
{
    public interface IContractService
    {
        void Add(Contract contract);
        void Update(Contract contract);
        Contract Get(int id);
        void Delete(int id);
        IEnumerable<Contract> Fetch(int start, int count);
        string OrderColumnName { get; set; }
        bool OrderAscending { get; set; }
    }
}

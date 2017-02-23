using ca_service.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ca_service.Interfaces
{
    public interface IContractRepository : IEntityRepository, IDisposable
    {
        void Add(Contract contract);
        void Update(Contract contract);
        Contract Get(int id);
        List<Contract> Fetch(int start, int count);
    }
}
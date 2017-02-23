using ca_service.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ca_service.Interfaces
{
    public interface IContractorRepository : IEntityRepository, IDisposable
    {
        void Add(Contractor contractor);
        void Update(Contractor contractor);
        Contractor Get(int id);
        List<Contractor> Fetch(int start, int count);
    }
}
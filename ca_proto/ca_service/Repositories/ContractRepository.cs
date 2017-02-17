using ca_service.Entities;
using ca_service.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;

namespace ca_service.Repositories
{
    public class ContractRepository : EntityRepository<Contract>, IContractRepository
    {
        public ContractRepository(IConfiguration configuration) : base(configuration)
        {
        }
    }
}

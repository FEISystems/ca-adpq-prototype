using ca_service.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ca_service.Entities;

namespace ca_service.Services
{
    public class ContractService : IContractService, IDisposable
    {
        private readonly IContractRepository contractRepository;

        public string OrderColumnName
        {
            get
            {
                return contractRepository.OrderColumnName;
            }
            set
            {
                contractRepository.OrderColumnName = value;
            }
        }

        public bool OrderAscending
        {
            get
            {
                return contractRepository.OrderAscending;
            }

            set
            {
                contractRepository.OrderAscending = value;
            }
        }

        public ContractService(IContractRepository contractRepository)
        {
            this.contractRepository = contractRepository;
        }

        public void Dispose()
        {
            if (contractRepository != null)
                contractRepository.Dispose();
        }

        public void Add(Contract contract)
        {
            if (null == contract)
                return;
            contractRepository.Add(contract);
        }

        public void Update(Contract contract)
        {
            if (null == contract)
                return;
            contractRepository.Update(contract);
        }

        public Contract Get(int id)
        {
            return contractRepository.Get(id);
        }

        public void Delete(int id)
        {
            contractRepository.Delete(id);
        }

        public IEnumerable<Contract> Fetch(int start, int count)
        {
            return contractRepository.Fetch(start, count);
        }
    }
}
using ca_service.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ca_service.Entities;

namespace ca_service.Services
{
    public class ContractorService : IContractorService
    {
        private readonly IContractorRepository contractorRepository;

        public string OrderColumnName
        {
            get
            {
                return contractorRepository.OrderColumnName;
            }
            set
            {
                contractorRepository.OrderColumnName = value;
            }
        }

        public bool OrderAscending
        {
            get
            {
                return contractorRepository.OrderAscending;
            }

            set
            {
                contractorRepository.OrderAscending = value;
            }
        }

        public ContractorService(IContractorRepository contractorRepository)
        {
            this.contractorRepository = contractorRepository;
        }

        public void Add(Contractor contractor)
        {
            if (null == contractor)
                return;
            contractorRepository.Add(contractor);
        }

        public void Update(Contractor contractor)
        {
            if (null == contractor)
                return;
            contractorRepository.Update(contractor);
        }

        public Contractor Get(int id)
        {
            return contractorRepository.Get(id);
        }

        public void Delete(int id)
        {
            contractorRepository.Delete(id);
        }

        public IEnumerable<Contractor> Fetch(int start, int count)
        {
            return contractorRepository.Fetch(start, count);
        }
    }
}
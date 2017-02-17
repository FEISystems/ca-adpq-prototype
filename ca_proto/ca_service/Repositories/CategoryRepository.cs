using ca_service.Entities;
using ca_service.Interfaces;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ca_service.Repositories
{
    public class CategoryRepository : EntityRepository<Category>, ICategoryRepository
    {
        public CategoryRepository(IConfiguration configuration)
            : base(configuration)
        {
        }

        public List<Category> Fetch()
        {
            return base.Fetch(0, int.MaxValue);
        }
    }
}

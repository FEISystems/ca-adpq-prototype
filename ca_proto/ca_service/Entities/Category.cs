using ca_service.Database;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ca_service.Entities
{
    [DbTable("ca.categories")]
    public class Category : Entity
    {
        public Category(int id) : base(id)
        {

        }

        [DbColumn(System.Data.DbType.String)]
        public string Name { get; set; }

        public ProductType ProductType { get; set; }

        public bool IsActive { get; set; }
    }
}

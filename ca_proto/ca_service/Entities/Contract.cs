using ca_service.Database;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ca_service.Entities
{
    [DbTable("ca.contracts")]
    public class Contract : Entity
    {
        public Contract(int id) : base(id)
        {

        }

        [DbColumn(System.Data.DbType.String)]
        public string Number { get; set; }
    }
}

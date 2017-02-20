using ca_service.Database;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ca_service.Entities
{
    [DbTable("ca.contractors")]
    public class Contractor : Entity
    {
        public Contractor(int id) : base(id)
        {

        }

        public string Name { get; set; }
    }
}

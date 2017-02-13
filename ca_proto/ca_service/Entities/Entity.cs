using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ca_service.Entities
{
    public abstract class Entity
    {
        public Entity(int id)
        {
            this.Id = id;
        }
        public int Id { get; set; }
    }
}

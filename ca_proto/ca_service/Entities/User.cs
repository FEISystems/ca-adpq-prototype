using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ca_service.Entities
{
    public class User: Entity
    {
        public User(int id) : base(id) { }
        public string UserName { get; set; }
        public string Password { get; set; }
        public int TimeZoneOffset { get; set; }
        public bool IsAdmin { get; set; }
    }
}

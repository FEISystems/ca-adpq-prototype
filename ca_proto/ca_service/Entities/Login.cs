using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ca_service.Entities
{
    public class Login
    {
        public string Token { get; set; }
        public string Message { get; set; }

        public bool IsAdmin { get; set; }

        public int UserId { get; set; }

        public string UserName { get; set; }
    }
}

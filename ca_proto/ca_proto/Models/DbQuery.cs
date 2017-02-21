using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ca_proto.Models
{
    public class DbQuery
    {
        public int Start { get; set; }
        public int Count { get; set; }
        public string OrderByColumn { get; set; }
        public bool OrderAscending { get; set; }
        public IDictionary<string, object> Filter { get; set; }
    }
}

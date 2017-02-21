using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ca_proto.Models
{
    public class CategoriesSearch
    {
        public int Start { get; set; }
        public int Count { get; set; }
        public string[] Categories { get; set; }
    }
}

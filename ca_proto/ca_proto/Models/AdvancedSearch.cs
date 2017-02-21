using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ca_proto.Models
{
    public class AdvancedSearch
    {
        public string Name { get; set; }
        public string Category { get; set; }
        public decimal? MinPrice { get; set; }
        public decimal? MaxPrice { get; set; }
        public string Manufacturer { get; set; }
        public string ManufacturerPartNumber { get; set; }
        public string SKU { get; set; }
    }
}

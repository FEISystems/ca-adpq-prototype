using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ca_proto.Models
{
    public class CartUpdate
    {
        public int ShoppingCartItemId { get; set; }
        public int Quantity { get; set; }
    }
}

using ca_service.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ca_proto.Models
{
    public class PlaceOrder
    {
        public int ShoppingCartId { get; set; }

        public OrderPaymentMethod PaymentMethod { get; set; }
    }
}

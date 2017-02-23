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
        public string Address1 { get; set; }
        public string Address2 { get; set; }
        public string Address3 { get; set; }
        public string City { get; set; }
        public string State { get; set; }
        public string PostalCode { get; set; }
        public string EmailAddress { get; set; }
    }
}

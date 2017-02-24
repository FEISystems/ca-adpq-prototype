using ca_service.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ca_proto.Helpers;

namespace ca_proto.Models
{
    public class OrderProductReportItem
    {
        public int OrderId { get; set; }
        public DateTime CreateDate { get; set; }
        public string PaymentMethod { get; set; }
        public string Status { get; set; }
        public decimal Price { get; set; }
        public int Quantity { get; set; }
        public decimal Total { get; set; }
        public string ProductType { get; set; }
        public string Contractor { get; set; }

        public OrderProductReportItem(OrderProduct orderProduct)
        {
            this.OrderId = orderProduct.OrderId;
            this.CreateDate = orderProduct.CreateDate;
            this.PaymentMethod = orderProduct.PaymentMethod.Description();
            this.Status = orderProduct.Status.ToString();
            this.Price = orderProduct.Price;
            this.Quantity = orderProduct.Quantity;
            this.Total = orderProduct.Price * orderProduct.Quantity;
            this.ProductType = orderProduct.ProductType;
            this.Contractor = orderProduct.Contractor;
        }
    }
}

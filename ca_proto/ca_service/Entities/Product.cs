using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ca_service.Entities
{
    public class Contract : Entity
    {
        public Contract(int id) : base(id)
        {

        }
    }

    public class Product : Entity
    {
        public Product(int id) : base(id)
        {

        }

        public string Name { get; set; }

        public decimal ListPrice { get; set; }
        public decimal ContractPrice { get; set; }

        public int ContractId { get; set; }

        public string Manufacturer { get; set; }

        public string ManufacturerPartNumber { get; set; }

        public string SKU { get; set; }

        public ProductType ProductType { get; set; }

        public List<int> ValidAsAddOnForParentProductIds { get; set; }

        public string Category { get; set; } //todo: is a string sufficient here?
    }

    public enum ProductType
    {
        Hardware = 1,
        Software = 2,
        Service = 3,
        Addon = 4
    }

    public class Order : Entity
    {
        public Order(int id) : base(id)
        {
            Status = OrderStatus.Placed;
        }

        public int UserId { get; set; }

        public List<OrderDetail> Details { get; set; }

        public OrderStatus Status { get; set; }

        public DateTime OrderDateUtc { get; set; }
    }

    public enum OrderStatus
    {
        Placed = 1,
        UserCancelled = 2,
        Shipped = 3
    }

    public class OrderDetail : Entity
    {
        public OrderDetail(int id) : base(id)
        {

        }

        public int OrderId { get; set; }

        public int ProductId { get; set; }

        public int Quantity { get; set; }
    }

    public class ShoppingCart
    {
        //todo: expand
        public int UserId { get; set; } //todo: how do we track an non-logged in user's cart
    }

    public class ShoppingCartItem
    {
        public int ProductId { get; set; }
        public decimal PriceAtTimeOfAdd { get; set; }
        public int Quantity { get; set; }
        public int ShoppingCartId { get; set; }
    }
}

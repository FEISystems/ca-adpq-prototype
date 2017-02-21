using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ca_service.Database;

namespace ca_service.Entities
{
    [DbTable("ca.products")]
    public class Product : Entity
    {
        public Product(int id) : base(id)
        {

        }

        [DbColumn(System.Data.DbType.String)]
        public string CLIN { get; set; }

        [DbColumn(System.Data.DbType.String)]
        public string UNSPSC { get; set; }

        [DbColumn(System.Data.DbType.String)]
        public string Description { get; set; }

        [DbColumn(System.Data.DbType.String)]
        public string UnitOfMeasure { get; set; }

        [DbColumn(System.Data.DbType.String)]
        public string QuantityPerUnitOfMeasure { get; set; }

        [DbColumn(System.Data.DbType.String)]
        public string ContractDiscount { get; set; }

        [DbColumn(System.Data.DbType.String)]
        public string ContractNumber { get; set; }

        [DbColumn(System.Data.DbType.String)]
        public string Contractor { get; set; }

        [DbColumn(System.Data.DbType.DateTime)]
        public DateTime ContractExpiration { get; set; }

        [DbColumn(System.Data.DbType.String)]
        public string Title { get; set; }

        [DbColumn(System.Data.DbType.Currency)]
        public decimal ListPrice { get; set; }

        [DbColumn(System.Data.DbType.Currency)]
        public decimal ContractPrice { get; set; }

        [DbColumn(System.Data.DbType.String)]
        public string Manufacturer { get; set; }

        [DbColumn(System.Data.DbType.String)]
        public string ManufacturerPartNumber { get; set; }

        [DbColumn(System.Data.DbType.String)]
        public string SKU { get; set; }

        [DbColumn(System.Data.DbType.String)]
        public string ProductType { get; set; }

        [DbColumn(System.Data.DbType.String)]
        public string Category { get; set; }

        [DbColumn(System.Data.DbType.Int32)]
        public int CategoryId { get; set; }
    }

    public enum ProductType
    {
        Hardware = 1,
        Software = 2,
        Service = 3
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

using ca_service.Database;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel;

namespace ca_service.Entities
{
    [DbTable("ca.orders")]
    public class Order : Entity
    {
        public Order(int id) : base(id) { }

        public Order() : base(0) { }

        [DbColumn(System.Data.DbType.Int32)]
        public OrderStatus Status { get; set; }

        [DbColumn(System.Data.DbType.DateTime)]
        public DateTime CreateDate { get; set; }

        [DbColumn(System.Data.DbType.Int32)]
        public int UserId { get; set; }

        public List<OrderItem> Items { get; set; }

        [DbColumn(System.Data.DbType.Int32)]
        public OrderPaymentMethod PaymentMethod { get; set; }

        [DbColumn(System.Data.DbType.String)]
        public string Address1 { get; set; }

        [DbColumn(System.Data.DbType.String)]
        public string Address2 { get; set; }

        [DbColumn(System.Data.DbType.String)]
        public string Address3 { get; set; }

        [DbColumn(System.Data.DbType.String)]
        public string City { get; set; }

        [DbColumn(System.Data.DbType.String)]
        public string State { get; set; }

        [DbColumn(System.Data.DbType.String)]
        public string PostalCode { get; set; }

        [DbColumn(System.Data.DbType.String)]
        public string EmailAddress { get; set; }
    }

    public enum OrderStatus
    {
        Placed = 1,
        UserCancelled = 2,
        Shipped = 3
    }
    
    public enum OrderPaymentMethod
    {
        [Description("California Department of General Services")]
        CaliforniaDepartmentofGeneralServices = 1,
        [Description("California Department of Technology")]
        CaliforniaDepartmentofTechnology = 2,
        [Description("California Department of Health and Human Services")]
        CaliforniaDepartmentofHealthandHumanServices = 3,
        [Description("California Department of Education")]
        CaliforniaDepartmentofEducation = 4
    }
}

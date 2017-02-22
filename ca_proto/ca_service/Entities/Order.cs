using ca_service.Database;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ca_service.Entities
{
    [DbTable("ca.orders")]
    public class Order : Entity
    {
        public Order(int id) : base(id)
        {

        }

        [DbColumn(System.Data.DbType.Int32)]
        public OrderStatus Status { get; set; }

        [DbColumn(System.Data.DbType.DateTime)]
        public DateTime OrderDateUtc { get; set; }

        [DbColumn(System.Data.DbType.Int32)]
        public int UserId { get; set; }

        public List<OrderItem> Items { get; set; }
    }

    public enum OrderStatus
    {
        Placed = 1,
        UserCancelled = 2,
        Shipped = 3
    }
}

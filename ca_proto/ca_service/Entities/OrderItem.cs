using ca_service.Database;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ca_service.Entities
{

    [DbTable("ca.orderitems")]
    public class OrderItem : Entity
    {
        public OrderItem(int id) : base(id)
        {

        }

        [DbColumn(System.Data.DbType.Int32)]
        public int OrderId { get; set; }

        [DbColumn(System.Data.DbType.Int32)]
        public int ProductId { get; set; }

        [DbColumn(System.Data.DbType.Int32)]
        public int Quantity { get; set; }

        [DbColumn(System.Data.DbType.Decimal)]
        public decimal Price { get; set; }
    }
}

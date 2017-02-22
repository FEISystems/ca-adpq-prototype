using ca_service.Database;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ca_service.Entities
{
    [DbTable("ca.shoppingcartitem")]
    public class ShoppingCartItem : Entity
    {
        public ShoppingCartItem(int id) : base(id)
        {

        }

        public ShoppingCartItem() : base(0)
        {

        }

        [DbColumn(System.Data.DbType.Int32)]
        public int ShoppingCartId { get; set; }

        [DbColumn(System.Data.DbType.Int32)]
        public int ProductId { get; set; }

        [DbColumn(System.Data.DbType.Int32)]
        public int Quantity { get; set; }

        [DbColumn(System.Data.DbType.String)]
        public string Description { get; set; }

        [DbColumn(System.Data.DbType.Decimal)]
        public decimal Price { get; set; }
    }
}

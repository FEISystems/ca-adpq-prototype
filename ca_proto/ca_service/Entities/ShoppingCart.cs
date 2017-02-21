using ca_service.Database;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ca_service.Entities
{
    [DbTable("ca.shoppingcart")]
    public class ShoppingCart : Entity
    {
        public ShoppingCart(int id) : base(id)
        {

        }

        public ShoppingCart() : base(0)
        {

        }

        [DbColumn(System.Data.DbType.Int32)]
        public int UserId { get; set; }

        [DbColumn(System.Data.DbType.DateTime)]
        public DateTime CreateDate { get; set; }

        public decimal Total { get; set; }

        public List<ShoppingCartItem> Items { get; set; }
        
    }
}

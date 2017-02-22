using ca_service.Database;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ca_service.Entities
{
    public enum ShoppingCartStatus
    {
        Active = 1,
        Complete = 2,
        Deactivated = 3           
    }
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
        [DbColumn(System.Data.DbType.Int32)]
        public ShoppingCartStatus Status { get; set; }

        public decimal Total
        {
            get
            {
                if (Items == null || !Items.Any())
                    return 0m;
                return Items.Sum(x => x.Price * x.Quantity);
            }
        }
        public List<ShoppingCartItem> Items { get; set; }
        
    }
}

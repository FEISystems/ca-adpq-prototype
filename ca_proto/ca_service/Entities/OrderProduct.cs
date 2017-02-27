using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ca_service.Entities
{
    public class OrderProduct
    {
        public int OrderId { get; set; }
        public DateTime CreateDate { get; set; }
        public OrderPaymentMethod PaymentMethod { get; set; }
        public OrderStatus Status { get; set; }
        public decimal Price { get; set; }
        public int Quantity { get; set; }
        public string ProductType { get; set; }
        public string Contractor { get; set; }

        public static OrderProduct Read(MySql.Data.MySqlClient.MySqlDataReader reader)
        {
            OrderProduct result = new OrderProduct();
            result.OrderId = (int)reader["OrderID"];
            result.CreateDate = (DateTime)reader["CreateDate"];
            result.PaymentMethod = (OrderPaymentMethod)reader["PaymentMethod"];
            result.Status = (OrderStatus)reader["Status"];
            result.Price = (decimal)reader["Price"];
            result.Quantity = (int)reader["Quantity"];
            result.ProductType = (string)reader["ProductType"];
            result.Contractor = (string)reader["Contractor"];
            return result;
        }

        private static readonly object sync = new object();
        private static string query = null;
        public static string Query
        {
            get
            {
                if (null == query)
                {
                    lock (sync)
                    {
                        if (null == query)
                        {
                            StringBuilder temp = new StringBuilder();
                            temp.AppendLine("select o.Id as OrderID, o.CreateDate, o.PaymentMethod, o.Status, oi.Price, oi.Quantity, p.ProductType, p.Contractor");
                            temp.AppendLine("  from orders o");
                            temp.AppendLine("  left outer join orderitems oi on oi.OrderId = o.Id");
                            temp.AppendLine("  inner join products p on p.Id = oi.ProductId");//if products are deleted do not return matching rows
                            temp.AppendLine("  where o.CreateDate between @StartDate and @EndDate");
                            query = temp.ToString();
                        }
                    }
                }
                return query;
            }
        }
    }
}

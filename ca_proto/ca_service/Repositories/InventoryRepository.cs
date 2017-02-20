using ca_service.Database;
using ca_service.Entities;
using ca_service.Interfaces;
using Microsoft.Extensions.Configuration;
using MySql.Data.MySqlClient;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Data;
using System.Text;

namespace ca_service.Repositories
{
    public class InventoryRepository : EntityRepository<Product>, IInventoryRepository
    {
        public InventoryRepository(IConfiguration configuration)
            : base(configuration)
        {
        }

        public List<Product> QuickSearch(string[] searchTerms)
        {
            string sql = @"
SELECT Id, Title
FROM Products
WHERE Title = @Title
";
            //todo: add more columns, etc
            var cmd = db.connection.CreateCommand();
            cmd.CommandText = sql;
            cmd.Parameters.Add(new MySqlParameter() { ParameterName = "@Title", Value = searchTerms[0] });
            var result = new List<Product>();

            using (var reader = cmd.ExecuteReader())
            {
                while (reader.Read())
                {
                    var product = new Product((int)reader["Id"])
                    {
                        Title = reader["Title"].ToString(),
                    };

                    result.Add(product);
                }
            }

            return result;
        }

    }
}

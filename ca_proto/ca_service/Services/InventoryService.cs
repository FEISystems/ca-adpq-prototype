using ca_service.Database;
using ca_service.Entities;
using ca_service.Interfaces;
using Microsoft.Extensions.Configuration;
using MySql.Data.MySqlClient;
using System;
using System.Collections.Generic;

namespace ca_service.Services
{
    public class InventoryService: IInventoryService, IDisposable
    {
        private readonly Connection db;

        public InventoryService(IConfiguration configuration)
        {
            db = new Connection(configuration);
        }

        public void Dispose()
        {
            if (db != null)
                db.Dispose();
        }

        public IEnumerable<Product> QuickSearch(string[] searchTerms)
        {
            if (searchTerms == null || searchTerms.Length == 0)
                return null;

            var result = new List<Product>();

            string sql = @"
SELECT Id, Name
FROM Products
WHERE Name = @Name
";
            //todo: add more columns, etc
            var cmd = db.connection.CreateCommand();
            cmd.CommandText = sql;
            cmd.Parameters.Add(new MySqlParameter() { ParameterName = "@Name", Value = searchTerms[0] });
            using (var reader = cmd.ExecuteReader())
            {
                while (reader.Read())
                {
                    var product = new Product((int)reader["Id"])
                    {
                        Name = reader["Name"].ToString(),
                    };

                    result.Add(product);
                }
            }

            return result;
        }
    }
}

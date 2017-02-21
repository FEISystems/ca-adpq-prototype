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
            if (searchTerms == null || searchTerms.Length == 0)
                return null;

            string baseSql = @"
SELECT C.Name AS CategoryName, P.Id, P.Title, P.Manufacturer, P.ManufacturerPartNumber, P.SKU
FROM Products P
JOIN Categories C ON P.CategoryId = C.Id
WHERE";

            string whereClause = @"
    (P.Title LIKE {0} OR Manufacturer LIKE {0} OR ManufacturerPartNumber LIKE {0} OR SKU LIKE {0} OR C.Name LIKE {0})
";

            var cmd = db.connection.CreateCommand();

            Func<string, string> toSqlParameterValue = v => $"%{v}%";

            StringBuilder sb = new StringBuilder();
            sb.Append(baseSql);

            for (int i = 0; i < searchTerms.Length; ++i)
            {
                var paramName = $"@P{i}";
                cmd.Parameters.Add(new MySqlParameter() { ParameterName = paramName, Value = toSqlParameterValue(searchTerms[i]) });
                sb.AppendFormat(whereClause, paramName);
                if(i < searchTerms.Length - 1)
                {
                    sb.AppendLine(@"
    OR");
                }
            }

            var result = new List<Product>();

            cmd.CommandText = sb.ToString();

            using (var reader = cmd.ExecuteReader())
            {
                while (reader.Read())
                {
                    var product = new Product((int)reader["Id"])
                    {
                        Title = reader["Title"].ToString(),
                        Manufacturer = reader["Manufacturer"].ToString(),
                        ManufacturerPartNumber = reader["ManufacturerPartNumber"].ToString(),
                        SKU = reader["SKU"].ToString(),
                    };

                    result.Add(product);
                }
            }

            return result;
        }        
    }
}

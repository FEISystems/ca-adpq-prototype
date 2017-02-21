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
using System.Data.Common;

namespace ca_service.Repositories
{
    public class InventoryRepository : EntityRepository<Product>, IInventoryRepository
    {
        public InventoryRepository(IConfiguration configuration)
            : base(configuration)
        {
        }

        private Product FromDataReader(DbDataReader reader)
        {
            var product = new Product((int)reader["Id"])
            {
                Title = reader["Title"].ToString(),
                Manufacturer = reader["Manufacturer"].ToString(),
                ManufacturerPartNumber = reader["ManufacturerPartNumber"].ToString(),
                SKU = reader["SKU"].ToString(),
                Category = reader["Category"].ToString()
            };

            return product;
        }

        [Obsolete("Use the base Fetch method.")]
        public List<Product> GetProductsByCategory(string category)
        {
            var filter = new Dictionary<string, object>();
            filter.Add("Category", category);
            return Fetch(0, int.MaxValue, filter).ToList();
        }

        public List<Product> QuickSearch(string[] searchTerms)
        {
            if (searchTerms == null || searchTerms.Length == 0)
                return null;

            string baseSql = @"
SELECT Category, Id, Title, Manufacturer, ManufacturerPartNumber, SKU
FROM Products P
WHERE";

            string whereClause = @"
    (Title LIKE {0} OR Manufacturer LIKE {0} OR ManufacturerPartNumber LIKE {0} OR SKU LIKE {0} OR Category LIKE {0})
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
                    var product = FromDataReader(reader);

                    result.Add(product);
                }
            }

            return result;
        }

        public IEnumerable<Product> FetchByCategories(int start, int count, string[] categories)
        {
            if (null == categories || categories.Length == 0)
                return Fetch(start, count);
            categories = categories.Where(item => null != item && !string.IsNullOrWhiteSpace(item)).ToArray();
            if (null == categories || categories.Length == 0)
                return Fetch(start, count);
            Func<string, string> toSqlParameterValue = v => $"%{v}%";
            using (var cmd = db.connection.CreateCommand())
            {
                StringBuilder sql = new StringBuilder();
                sql.Append("select * from Products where ");
                string paramName = "@" + categories[0];
                sql.Append(" Category like ");
                sql.Append(paramName);
                cmd.Parameters.Add(new MySqlParameter() { ParameterName = paramName, Value = toSqlParameterValue(categories[0]) });
                for (int i=1; i<categories.Length; i++)
                {
                    paramName = "@" + categories[i];
                    sql.Append(" or Category like ");
                    sql.Append(paramName);
                    cmd.Parameters.Add(new MySqlParameter() { ParameterName = paramName, Value = toSqlParameterValue(categories[i]) });
                }
                sql.Append(" order by Category");
                cmd.CommandText = sql.ToString();
                List<Product> result = new List<Product>();
                using (var reader = cmd.ExecuteReader() as MySqlDataReader)
                {
                    while (reader.Read())
                        result.Add(ReadEntity(reader));
                }
                return result;
            }
        }
    }
}

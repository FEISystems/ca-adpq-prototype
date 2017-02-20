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
            if (searchTerms == null || !searchTerms.Any())
                return null;

            string baseSql = @"
SELECT C.Name AS CategoryName, P.Id, P.Name, P.Manufacturer, P.ManufacturerPartNumber, P.SKU
FROM Products P
JOIN Categories C ON P.CategoryId = C.Id
WHERE";

            string whereClause = @"
    (P.Name LIKE {0} OR Manufacturer LIKE {0} OR ManufacturerPartNumber LIKE {0} OR SKU LIKE {0} OR C.Name LIKE {0})
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
                        Name = reader["Name"].ToString(),
                        Manufacturer = reader["Manufacturer"].ToString(),
                        ManufacturerPartNumber = reader["ManufacturerPartNumber"].ToString(),
                        SKU = reader["SKU"].ToString(),
                    };

                    result.Add(product);
                }
            }

            return result;
        }

        public void Import(string fileContent)
        {
            //todo: assume first row identifies columns
            string[] lines = fileContent.Split(new char[] { '\n' }, StringSplitOptions.RemoveEmptyEntries);
            if (lines.Length < 2)
                return;//need at least one column row and one data row
            List<string> columnNames = new List<string>(lines[0].Split(new char[] { ',' }).Select(s => s.Trim().ToLower()));
            for (int i=1; i<lines.Length; i++)
            {
                string[] values = lines[i].Split(new char[] { ',' }).Select(s => s.Trim()).ToArray();
                var product = new Product(0);
                foreach (var column in Columns)
                {
                    int colIndex = columnNames.IndexOf(column.ColumnName.ToLower());
                    if (colIndex == -1)
                        continue;
                    column.Property.SetValue(product, GetValue(values, colIndex, column.DbType));
                }
                Add(product);
            }
        }

        //todo: support other data types if necessary
        private object GetValue(string[] values, int colIndex, DbType dbType)
        {
            string value = values[colIndex];
            if (dbType == DbType.Int32)
            {
                if (string.IsNullOrWhiteSpace(value))
                    return 0;
                return int.Parse(value);
            }
            else if (dbType == DbType.Currency)
            {
                if (string.IsNullOrWhiteSpace(value))
                    return 0.0m;
                return decimal.Parse(value);
            }
            return value;
        }
    }
}

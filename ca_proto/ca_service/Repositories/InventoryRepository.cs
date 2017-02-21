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
SELECT Id, Name
FROM Products
WHERE Name = @Name
";
            //todo: add more columns, etc
            var cmd = db.connection.CreateCommand();
            cmd.CommandText = sql;
            cmd.Parameters.Add(new MySqlParameter() { ParameterName = "@Name", Value = searchTerms[0] });
            var result = new List<Product>();

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

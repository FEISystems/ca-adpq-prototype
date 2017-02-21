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

            StringBuilder sb = new StringBuilder();
            sb.Append(baseSql);

            for (int i = 0; i < searchTerms.Length; ++i)
            {
                var paramName = $"@P{i}";
                cmd.Parameters.Add(new MySqlParameter() { ParameterName = paramName, Value = ToSqlParameterValueForLike(searchTerms[i]) });
                sb.AppendFormat(whereClause, paramName);
                if(i < searchTerms.Length - 1)
                {
                    sb.AppendLine(@"
    OR");
                }
            }

            cmd.CommandText = sb.ToString();

            return GetProductsFromCommand(cmd);
        }

        private List<Product> GetProductsFromCommand(DbCommand cmd)
        {
            var result = new List<Product>();

            using (var reader = cmd.ExecuteReader() as MySqlDataReader)
            {
                while (reader.Read())
                    result.Add(ReadEntity(reader));
            }

            return result;
        }

        private string ToSqlParameterValueForLike(string s)
        {
            return $"%{s}%";
        }

        public List<Product> AdvancedSearch(string name, string category, decimal? minPrice, decimal? maxPrice, string manufacturer, string manufacturerPartNumber, string sku)
        {
            if (string.IsNullOrWhiteSpace(name) &&
                string.IsNullOrWhiteSpace(category) &&
                string.IsNullOrWhiteSpace(manufacturer) &&
                string.IsNullOrWhiteSpace(manufacturerPartNumber) &&
                string.IsNullOrWhiteSpace(sku) &&
                minPrice == null && maxPrice == null)
            {
                throw new Exception("At least one search term is required.");
            }

            var sql = new StringBuilder();

            sql.Append(@"
SELECT * FROM Products
WHERE
");
            bool needsAnd = false;

            List<MySqlParameter> parms = new List<MySqlParameter>();

            if(!string.IsNullOrWhiteSpace(name))
            {
                sql.Append(@"
    (Title LIKE @Title OR Description LIKE @Title)");
                needsAnd = true;

                parms.Add(new MySqlParameter() { ParameterName = "@Title", Value = ToSqlParameterValueForLike(name) });
            }

            if(!string.IsNullOrWhiteSpace(category))
            {
                if (needsAnd)
                {
                    sql.Append(@"
    AND");
                }

                sql.Append(@"
    Category LIKE @Category");

                needsAnd = true;

                parms.Add(new MySqlParameter() { ParameterName = "@Category", Value = ToSqlParameterValueForLike(category) });
            }

            if(minPrice.HasValue)
            {
                if (needsAnd)
                {
                    sql.Append(@"
    AND");
                }

                sql.Append(@"
    ContractPrice >= @MinPrice");

                needsAnd = true;

                parms.Add(new MySqlParameter() { ParameterName = "@MinPrice", Value = minPrice });
            }

            if (maxPrice.HasValue)
            {
                if (needsAnd)
                {
                    sql.Append(@"
    AND");
                }

                sql.Append(@"
    ContractPrice <= @MaxPrice");

                needsAnd = true;

                parms.Add(new MySqlParameter() { ParameterName = "@MaxPrice", Value = maxPrice });
            }

            if (!string.IsNullOrWhiteSpace(manufacturer))
            {
                if (needsAnd)
                {
                    sql.Append(@"
    AND");
                }

                sql.Append(@"
    Manufacturer LIKE @Manufacturer");

                needsAnd = true;

                parms.Add(new MySqlParameter() { ParameterName = "@Manufacturer", Value = ToSqlParameterValueForLike(manufacturer) });
            }

            if (!string.IsNullOrWhiteSpace(manufacturerPartNumber))
            {
                if (needsAnd)
                {
                    sql.Append(@"
    AND");
                }

                sql.Append(@"
    ManufacturerPartNumber LIKE @ManufacturerPartNumber");

                needsAnd = true;

                parms.Add(new MySqlParameter() { ParameterName = "@ManufacturerPartNumber", Value = ToSqlParameterValueForLike(manufacturerPartNumber) });
            }

            if (!string.IsNullOrWhiteSpace(sku))
            {
                if (needsAnd)
                {
                    sql.Append(@"
    AND");
                }

                sql.Append(@"
    SKU LIKE @SKU");

                needsAnd = true;

                parms.Add(new MySqlParameter() { ParameterName = "@SKU", Value = ToSqlParameterValueForLike(sku) });
            }

            using (var cmd = db.connection.CreateCommand())
            {
                cmd.CommandText = sql.ToString();

                cmd.Parameters.AddRange(parms.ToArray());

                return GetProductsFromCommand(cmd);
            }
        }

        //public IEnumerable<Product> FetchByCategories(int start, int count, string[] categories)
        //{
        //    if (null == categories || categories.Length == 0)
        //        return Fetch(start, count);
        //    categories = categories.Where(item => null != item && !string.IsNullOrWhiteSpace(item)).ToArray();
        //    if (null == categories || categories.Length == 0)
        //        return Fetch(start, count);

        //    using (var cmd = db.connection.CreateCommand())
        //    {
        //        StringBuilder sql = new StringBuilder();
        //        sql.Append("select * from Products where ");
        //        string paramName = "@" + categories[0];
        //        sql.Append(" Category like ");
        //        sql.Append(paramName);
        //        cmd.Parameters.Add(new MySqlParameter() { ParameterName = paramName, Value = ToSqlParameterValueForLike(categories[0]) });
        //        for (int i=1; i<categories.Length; i++)
        //        {
        //            paramName = "@" + categories[i];
        //            sql.Append(" or Category like ");
        //            sql.Append(paramName);
        //            cmd.Parameters.Add(new MySqlParameter() { ParameterName = paramName, Value = ToSqlParameterValueForLike(categories[i]) });
        //        }
        //        sql.Append(" order by Category");
        //        cmd.CommandText = sql.ToString();

        //        return GetProductsFromCommand(cmd);
        //    }
        //}
    }
}

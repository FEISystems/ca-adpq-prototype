using CsvHelper;
using CsvHelper.Configuration;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;

namespace CsvFixer
{
    public class Program
    {
        public enum ProductType
        {
            Hardware = 1,
            Software = 2,
            Service = 3
        }

        public sealed class ProductDtoMap : CsvClassMap<ProductDto>
        {
            private decimal ConvertPrices(ICsvReaderRow row, int index)
            {
                var val = row.GetField<string>(index)
                    .Replace("$", string.Empty)
                    .Replace("-", string.Empty)
                    .Trim();

                if (string.IsNullOrWhiteSpace(val))
                    return 0m;

                if (val.Equals("included", StringComparison.OrdinalIgnoreCase))
                    return 0m;

                return decimal.Parse(val);

            }
            public ProductDtoMap()
            {
                Map(m => m.CLIN).Index(0);
                Map(m => m.UNSPSC).Index(1);
                Map(m => m.ManufacturerPartNumber).Index(2);
                Map(m => m.Manufacturer).Index(3);
                Map(m => m.SKU).Index(4);
                Map(m => m.ProductTitle).Index(5);
                Map(m => m.ProductDescription).Index(6);
                Map(m => m.UnitOfMeasure).Index(7);
                Map(m => m.Quantity).Index(8);
                Map(m => m.ListPrice).Index(9).ConvertUsing(row => ConvertPrices(row, 9));
                Map(m => m.ContractPrice).Index(10).ConvertUsing(row => ConvertPrices(row, 10));
                Map(m => m.ContractDiscount).Index(11).ConvertUsing(row => decimal.Parse(row.GetField<string>(11).Replace("%", "")));
                Map(m => m.Category).Index(12);
                Map(m => m.ProductType).Index(13);
                Map(m => m.ContractNumber).Index(14);
                Map(m => m.Contractor).Index(15);
                Map(m => m.ContractExpirationDate).Index(16);
            }
        }

        public class ProductDto
        {
            public ProductType ActualProductType
            {
                get
                {
                    return (ProductType)Enum.Parse(typeof(ProductType), ProductType);
                }
            }
            public ProductDto()
            {

            }

            public string CLIN { get; set; }
            public string UNSPSC { get; set; }
            public string ManufacturerPartNumber { get; set; }
            public string Manufacturer { get; set; }
            public string SKU { get; set; }
            public string ProductTitle { get; set; }
            public string ProductDescription { get; set; }
            public string UnitOfMeasure { get; set; }
            public string Quantity { get; set; }
            public decimal ListPrice { get; set; }
            public decimal ContractPrice { get; set; }
            public decimal ContractDiscount { get; set; }

            public decimal RealDiscount
            {
                get
                {
                    if (ListPrice == 0m)
                        return 0m;

                    return ContractPrice / ListPrice;
                }
            }
            public string Category { get; set; }
            public string ProductType { get; set; }
            public string ContractNumber { get; set; }
            public string Contractor { get; set; }
            public DateTime ContractExpirationDate { get; set; }
        }

        public static void Main(string[] args)
        {
            string rootPath = @"C:\dev\ca-adpq-prototype\",
                csvPath = @"Data Set_ADPQ_v5.csv",
                categoriesOutput = @"categories.txt",
                contractorsOutput = @"contractors.txt",
                contractsOutput = @"contracts.txt",
                productsOutput = @"products.txt";

            var categories = new HashSet<string>(StringComparer.OrdinalIgnoreCase);
            var contractorHash = new HashSet<string>(StringComparer.OrdinalIgnoreCase);
            var contractHash = new HashSet<string>(StringComparer.OrdinalIgnoreCase);

            var contractData = new List<Tuple<string, string, DateTime>>();
            var categoryData = new Dictionary<string, ProductType>();

            List<ProductDto> allProducts = new List<ProductDto>();

            using (var fs = new FileStream(Path.Combine(rootPath, csvPath), FileMode.Open))
            {
                using (var reader = new StreamReader(fs))
                {
                    using (var csv = new CsvHelper.CsvReader(reader))
                    {
                        csv.Configuration.RegisterClassMap<ProductDtoMap>();

                        try
                        {

                            allProducts = csv.GetRecords<ProductDto>().ToList();
                        }
                        catch (Exception x)
                        {
                            Console.WriteLine(x.Message);

                            if (x.Data.Contains("CsvHelper"))
                                Console.WriteLine(x.Data["CsvHelper"].ToString());

                            throw;
                        }
                    }
                }
            }

            //create the contract hash
            foreach (var p in allProducts)
            {
                if(categories.Add(p.Category))
                {
                    categoryData.Add(p.Category, p.ActualProductType);
                }

                if(contractHash.Add(p.ContractNumber))
                {
                    contractData.Add(new Tuple<string, string, DateTime>(p.ContractNumber.Trim(), p.Contractor.Trim(), p.ContractExpirationDate));
                }
            }

            //create the contractor hash
            foreach (var t in contractData)
            {
                contractorHash.Add(t.Item2);
            }

            var sb = new StringBuilder();

            #region Categories

            var categoryLookups = new Dictionary<string, int>(StringComparer.OrdinalIgnoreCase);

            int index = 1;

            foreach (var c in categories)
            {
                var productType = categoryData[c];
                sb.AppendLine($"INSERT INTO categories (Id, Name, IsActive, ProductType)");
                sb.AppendLine($"VALUES ({index}, '{c.ToSqlString()}', 1, {(int)productType});");
                sb.AppendLine();

                categoryLookups.Add(c, index);

                ++index;
            }

            File.WriteAllText(Path.Combine(rootPath, categoriesOutput), sb.ToString());

            Console.WriteLine("Categories Finished.");

            #endregion

            sb = new StringBuilder();
            index = 1;

            #region Contractors

            var contractorLookups = new Dictionary<string, int>();

            foreach(var c in contractorHash)
            {
                sb.AppendLine($"INSERT INTO contractors (Id, Name)");
                sb.AppendLine($"VALUES ({index}, '{c.ToSqlString()}');");
                sb.AppendLine();

                contractorLookups.Add(c, index);

                ++index;
            }

            File.WriteAllText(Path.Combine(rootPath, contractorsOutput), sb.ToString());

            Console.WriteLine("Contractors Finished.");

            #endregion

            sb = new StringBuilder();
            index = 1;

            #region Contracts

            var contractLookups = new Dictionary<string, int>();

            foreach(var c in contractHash)
            {
                var tuple = contractData.First(z => z.Item1.Equals(c, StringComparison.OrdinalIgnoreCase));
                var contractId = contractorLookups[tuple.Item2];

                sb.AppendLine($"INSERT INTO contracts (Id, Name, ExpirationDate, ContractorId)");
                sb.AppendLine($"VALUES ({index}, '{c.ToSqlString()}', '{tuple.Item3.ToString("yyyy-MM-dd")}', {contractId});");
                sb.AppendLine();

                contractLookups.Add(c, index);

                ++index;
            }

            File.WriteAllText(Path.Combine(rootPath, contractsOutput), sb.ToString());

            Console.WriteLine("Contracts Finished.");

            #endregion

            sb = new StringBuilder();

            #region Products

            foreach (var p in allProducts)
            {
                var categoryId = categoryLookups[p.Category];
                var contractId = contractLookups[p.ContractNumber];

                sb.AppendLine($"INSERT INTO products (Name, ContractId, Manufacturer, ManufacturerPartNumber, SKU, ProductType, CategoryId, ListPrice, ContractPrice, CLIN, UNSPSC, UnitOfMeasure, Quantity, ContractDiscount)");
                sb.AppendLine($"VALUES ('{p.ProductTitle.ToSqlString()}', {contractId}, '{p.Manufacturer.ToSqlString()}', '{p.ManufacturerPartNumber.ToSqlString()}', '{p.SKU.ToSqlString()}', {(int)p.ActualProductType}, {categoryId}, {p.ListPrice}, {p.ContractPrice}, '{p.CLIN.ToSqlString()}', '{p.UNSPSC.ToSqlString()}', '{p.UnitOfMeasure.ToSqlString()}', '{p.Quantity.ToSqlString()}', {p.ContractDiscount/100m});");
                sb.AppendLine();
            }

            File.WriteAllText(Path.Combine(rootPath, productsOutput), sb.ToString());

            Console.WriteLine("Products Finished.");

            #endregion

            Console.ReadLine();
        }
    }

    public static class Extensions
    {
        public static string ToSqlString(this string s)
        {
            return s.Trim().Replace("'", "''");
        }
    }

    
}

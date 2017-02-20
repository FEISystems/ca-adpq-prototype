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
        public sealed class ProductDtoMap : CsvClassMap<ProductDto>
        {
            public ProductDtoMap()
            {
                Map(m => m.CLIN).Index(0);
                Map(m => m.UNSPSC).Index(1);
                Map(m => m.ManufacturerPartNumber).Index(2);
                Map(m => m.Manufacturer).Index(3);
                Map(m => m.SKU).Index(4);
                Map(m => m.ProductTitle).Index(5);
                Map(m => m.ProductDescription).Index(6);
                Map(m => m.ListPrice).Index(9).TypeConverterOption(System.Globalization.NumberStyles.Currency);
                Map(m => m.ContractPrice).Index(10).TypeConverterOption(System.Globalization.NumberStyles.Currency);
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
            public decimal ListPrice { get; set; }
            public decimal ContractPrice { get; set; }
            public decimal ContractDiscount { get; set; }
            public string Category { get; set; }
            public string ProductType { get; set; }
            public string ContractNumber { get; set; }
            public string Contractor { get; set; }
            public string ContractExpirationDate { get; set; }
        }

        public static void Main(string[] args)
        {
            string rootPath = @"C:\dev\ca-adpq-prototype\",
                csvPath = @"Data Set_ADPQ_v5.csv",
                categoriesOutput = @"categories.txt";

            var categories = new HashSet<string>(StringComparer.OrdinalIgnoreCase);

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

            foreach(var p in allProducts)
            {
                categories.Add(p.Category);
            }

            var sb = new StringBuilder();

            Dictionary<string, int> categoryLookups = new Dictionary<string, int>();

            int categoryId = 1;

            foreach (var c in categories)
            {
                sb.AppendLine($"INSERT INTO categories (Id, Name)");
                sb.AppendLine($"VALUES ({categoryId}, '{c.ToSqlString()}');");
                sb.AppendLine();

                categoryLookups.Add(c, categoryId);

                ++categoryId;
            }

            File.WriteAllText(Path.Combine(rootPath, categoriesOutput), sb.ToString());

            Console.WriteLine("Categories Finished.");

            

            Console.ReadLine();
        }

        
    }

    public static class Extensions
    {
        public static string ToSqlString(this string s)
        {
            return s.Replace("'", "''");
        }
    }

    
}

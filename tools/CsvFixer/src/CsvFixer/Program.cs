using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CsvFixer
{
    public class Program
    {
        public static void Main(string[] args)
        {
            string rootPath = @"C:\dev\ca-adpq-prototype\",
                csvPath = @"Data Set_ADPQ_v5.csv",
                categoriesOutput = @"categories.txt";

            var categories = new HashSet<string>();

            using (var fs = new FileStream(System.IO.Path.Combine(rootPath, csvPath), System.IO.FileMode.Open))
            {
                using (var reader = new StreamReader(fs))
                {
                    using (var csv = new CsvHelper.CsvReader(reader))
                    {
                        //categories is 13th column
                        while (csv.Read())
                        {
                            var category = csv.GetField<string>(12);
                            categories.Add(category);
                        }
                    }
                }
            }

            var sb = new StringBuilder();
            var sb2 = new StringBuilder();

            foreach(var c in categories)
            {
                sb.AppendLine($"INSERT INTO categories (Name)");
                sb.AppendLine($"VALUES ('{c.ToSqlString()}');");
                sb.AppendLine();

                sb2.AppendLine(c);
            }

            File.WriteAllText(Path.Combine(rootPath, categoriesOutput), sb2.ToString());

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

using ca_service.Database;
using ca_service.Entities;
using ca_service.Interfaces;
using Microsoft.Extensions.Configuration;
using MySql.Data.MySqlClient;
using System;
using System.Collections.Generic;
using System.Text;
using System.Linq;
using ca_service.Repositories;

namespace ca_service.Services
{
    public class InventoryService : IInventoryService, IDisposable
    {
        private readonly IInventoryRepository inventoryRepository;
        private readonly ICategoryRepository categoryRepository;

        public InventoryService(IInventoryRepository inventoryRepository, ICategoryRepository categoryRepository)
        {
            this.inventoryRepository = inventoryRepository;
            this.categoryRepository = categoryRepository;
        }

        public void Dispose()
        {
            if (inventoryRepository != null)
                inventoryRepository.Dispose();
        }

        public IEnumerable<Product> QuickSearch(string[] searchTerms)
        {
            if (searchTerms == null || searchTerms.Length == 0)
                return null;

            var result = inventoryRepository.QuickSearch(searchTerms);

            return result;
        }

        public void Add(Product product)
        {
            if (null == product)
                throw new Exception("A product must be provided");
            inventoryRepository.Add(product);
        }

        public void Update(Product product)
        {
            if (null == product)
                return;
            inventoryRepository.Update(product);
        }

        public void Import(string fileContent)
        {
            if (string.IsNullOrWhiteSpace(fileContent))
                return;
            List<Category> existingCategories = categoryRepository.Fetch();
            //todo: assume first row identifies columns
            string[] lines = fileContent.Split(new char[] { '\n' }, StringSplitOptions.RemoveEmptyEntries);
            if (lines.Length < 2)
                return;//need at least one column row and one data row
            List<string> columnNames = new List<string>(lines[0].Split(new char[] { ',' }).Select(s => s.Trim().ToLower()));
            //todo: make sure we have all required column names
            for (int i = 1; i < lines.Length; i++)
            {
                string[] values = SplitCSVValues(lines[i]);
                var product = new Product(0);
                foreach (var column in EntityRepository<Product>.Columns)
                {
                    int colIndex = columnNames.IndexOf(column.ColumnName.ToLower());
                    if (colIndex == -1)
                        continue;
                    column.Property.SetValue(product, DbColumnAttribute.GetValue(values, colIndex, column.DbType));
                }
                Add(product);
                AddCategory(existingCategories, product.Category);
            }
        }

        private void AddCategory(List<Category> existingCategories, string category)
        {
            if (string.IsNullOrWhiteSpace(category))
                return;
            if (!existingCategories.Any(item => item.Name.Equals(category, StringComparison.OrdinalIgnoreCase)))
            {
                Category temp = new Category(0) { Name = category };
                categoryRepository.Add(temp);
                existingCategories.Add(temp);
            }
        }

        private string[] SplitCSVValues(string line)
        {
            if (string.IsNullOrWhiteSpace(line))
                return null;
            List<string> result = new List<string>(line.Split(','));
            StringBuilder builder = new StringBuilder();
            //need to reconstitue quoted values //todo: optimize this
            for (int i = result.Count - 1; i >= 0; i--)
            {
                if (builder.Length != 0)
                {
                    if (result[i].TrimStart().StartsWith("\""))
                    {
                        result[i] = (result[i] + builder.ToString()).Replace("\"", "").Trim();
                        builder.Length = 0;
                        continue;
                    }
                    else
                    {
                        builder.Insert(0, result[i]);
                        result.RemoveAt(i);
                    }
                }
                else if (result[i].TrimEnd().EndsWith("\""))
                {
                    builder.Length = 0;
                    builder.Append(result[i]);
                    result.RemoveAt(i);
                }
                else
                {
                    result[i] = result[i].Trim();
                }
            }
            return result.Select(item => item.Trim()).ToArray();
        }

        public Product Get(int id)
        {
            return inventoryRepository.Get(id);
        }

        public void Delete(int id)
        {
            inventoryRepository.Delete(id);
        }

        public IEnumerable<Product> Fetch(int start, int count)
        {
            return inventoryRepository.Fetch(start, count);
        }
        public string OrderColumnName
        {
            get { return inventoryRepository.OrderColumnName; }
            set { inventoryRepository.OrderColumnName = value; }
        }

        public bool OrderAscending
        {
            get { return inventoryRepository.OrderAscending; }
            set { inventoryRepository.OrderAscending = value; }
        }
    }
}

using ca_service.Entities;
using ca_service.Interfaces;
using System;
using System.Collections.Generic;
using System.Text;
using System.Linq;
using ca_service.Repositories;
using ca_service.Database;
using System.Data;

namespace ca_service.Services
{
    public class InventoryService : IInventoryService, IDisposable
    {
        private readonly IInventoryRepository inventoryRepository;
        private readonly ICategoryRepository categoryRepository;
        private readonly IContractRepository contractRepository;
        private readonly IContractorRepository contractorRepository;

        public InventoryService(IInventoryRepository inventoryRepository,
            ICategoryRepository categoryRepository,
            IContractRepository contractRepository,
            IContractorRepository contractorRepository)
        {
            this.inventoryRepository = inventoryRepository;
            this.categoryRepository = categoryRepository;
            this.contractRepository = contractRepository;
            this.contractorRepository = contractorRepository;
        }

        public void Dispose()
        {
            if (inventoryRepository != null)
                inventoryRepository.Dispose();
        }

        public List<Product> QuickSearch(string[] searchTerms)
        {
            if (searchTerms == null || searchTerms.Length == 0)
                return null;

            var result = inventoryRepository.QuickSearch(searchTerms);

            return result;
        }

        public void Add(Product product)
        {
            Add(product, true);
        }

        private void Add(Product product, bool checkAddCodes)
        {
            if (null == product)
                throw new Exception("A product must be provided");
            inventoryRepository.Add(product);
            if (checkAddCodes)
            {
                List<Category> existingCategories = categoryRepository.Fetch();
                List<Contract> existingContracts = contractRepository.Fetch(0, int.MaxValue);
                List<Contractor> existingContractors = contractorRepository.Fetch(0, int.MaxValue);
                AddCategory(existingCategories, product.Category, product.ProductType);
                AddContract(existingContracts, product.ContractNumber);
                AddContractor(existingContractors, product.Contractor);
            }
        }

        public void Update(Product product)
        {
            if (null == product)
                return;
            inventoryRepository.Update(product);
        }

        private List<DbColumnAttribute> ProductColumns
        {
            get { return EntityRepository<Product>.Columns; }
        }

        public string Import(string fileContent)
        {
            if (string.IsNullOrWhiteSpace(fileContent))
                return "No file content provided";
            List<Category> existingCategories = categoryRepository.Fetch();
            List<Contract> existingContracts = contractRepository.Fetch(0, int.MaxValue);
            List<Contractor> existingContractors = contractorRepository.Fetch(0, int.MaxValue);
            string[] lines = fileContent.Split(new char[] { '\n' }, StringSplitOptions.RemoveEmptyEntries);
            if (lines.Length < 2)
                return "At least one column row and one data row must be provided";//need at least one column row and one data row
            int productCount = 0;
            int categoryCount = 0;
            int contractCount = 0;
            int contractorCount = 0;
            int skippedCount = 0;
            int errorCount = 0;
            StringBuilder result = new StringBuilder();
            List<string> columnNames = new List<string>(lines[0].Split(new char[] { ',' }).Select(s => s.Trim().ToLower().Replace(" ", "")));
            try
            {
                TestHaveRequiredColumnNames(columnNames);
                for (int i = 1; i < lines.Length; i++)
                {
                    try
                    {
                        string[] values = SplitCSVValues(lines[i]);
                        var product = new Product(0);
                        foreach (var column in ProductColumns)
                        {
                            int colIndex = columnNames.IndexOf(column.ColumnName.ToLower());
                            if (colIndex == -1)
                                continue;
                            try
                            {
                                column.Property.SetValue(product, GetCSVValue(values, colIndex, column.DbType));
                            }
                            catch
                            {
                                throw new Exception(string.Format("Error converting data '{0}' for column '{1}' in row {2}. Expected data type {3}",
                                    values[colIndex], column.ColumnName, i, column.DbType));
                            }
                        }
                        if (!ContractLineItemNumberExists(product))
                        {
                            Add(product);
                            ++productCount;
                            if (AddCategory(existingCategories, product.Category, product.ProductType))
                                ++categoryCount;
                            if (AddContract(existingContracts, product.ContractNumber))
                                ++contractCount;
                            if (AddContractor(existingContractors, product.Contractor))
                                ++contractorCount;
                        }
                        else
                            ++skippedCount;
                    }
                    catch (Exception x)
                    {
                        result.Append(x.Message + "\n");
                        ++errorCount;
                    }
                }
            }
            catch (Exception x)
            {
                result.Append(x.Message + "\n");
                ++errorCount;
            }
            result.AppendFormat("Added {0} products\n", productCount);
            result.AppendFormat("Added {0} categories\n", categoryCount);
            result.AppendFormat("Added {0} contracts\n", contractCount);
            result.AppendFormat("Added {0} contractors\n", contractorCount);
            result.AppendFormat("Skipped {0} entries", skippedCount);
            if (errorCount > 0)
            {
                result.AppendFormat("\n{0} errors encountered. Please make corrections to the data and try the import again.", errorCount);
            }
            return result.ToString();
        }

        private bool ContractLineItemNumberExists(Product product)
        {
            //unique key is contract number + clin
            IEnumerable<Product> existing = inventoryRepository.Where(product, "CLIN", "ContractNumber");
            return existing.Any();
        }

        private bool AddCategory(List<Category> existingCategories, string category, string productType)
        {
            if (string.IsNullOrWhiteSpace(category))
                return false;
            if (!existingCategories.Any(item => item.Name.Equals(category, StringComparison.OrdinalIgnoreCase)))
            {
                Category temp = new Category(0) { Name = category, ProductType = ProductTypeFromString(productType), IsActive = true };
                categoryRepository.Add(temp);
                existingCategories.Add(temp);
                return true;
            }
            return false;
        }

        private ProductType ProductTypeFromString(string s)
        {
            if (ProductType.Hardware.ToString().Equals(s, StringComparison.OrdinalIgnoreCase))
                return ProductType.Hardware;
            if (ProductType.Software.ToString().Equals(s, StringComparison.OrdinalIgnoreCase))
                return ProductType.Software;
            if (ProductType.Service.ToString().Equals(s, StringComparison.OrdinalIgnoreCase))
                return ProductType.Service;
            throw new Exception(string.Format("Unsupported ProductType '{0}'", s));
        }

        private bool AddContract(List<Contract> existingContracts, string contractNumber)
        {
            if (string.IsNullOrWhiteSpace(contractNumber))
                return false;
            if (!existingContracts.Any(item => item.Number.Equals(contractNumber, StringComparison.OrdinalIgnoreCase)))
            {
                Contract temp = new Contract(0) { Number = contractNumber };
                contractRepository.Add(temp);
                existingContracts.Add(temp);
                return true;
            }
            return false;
        }

        private bool AddContractor(List<Contractor> existingContractors, string contractor)
        {
            if (string.IsNullOrWhiteSpace(contractor))
                return false;
            if (!existingContractors.Any(item => item.Name.Equals(contractor, StringComparison.OrdinalIgnoreCase)))
            {
                Contractor temp = new Contractor(0) { Name = contractor };
                contractorRepository.Add(temp);
                existingContractors.Add(temp);
                return true;
            }
            return false;
        }

        private static object GetCSVValue(string[] values, int colIndex, DbType dbType)
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
                return decimal.Parse(value, System.Globalization.NumberStyles.Currency);
            }
            else if (dbType == DbType.DateTime)
            {
                if (string.IsNullOrWhiteSpace(value))
                    return DateTime.MinValue;
                return DateTime.Parse(value);
            }
            return value;
        }

        private void TestHaveRequiredColumnNames(List<string> columnNames)
        {
            foreach (DbColumnAttribute column in ProductColumns)
            {
                if (!columnNames.Contains(column.ColumnName.ToLower()))
                    throw new Exception(string.Format("Missing column name '{0}'.", column.ColumnName));
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
                    string temp = result[i].Trim();
                    if (temp.Length > 2 && temp.StartsWith("\""))
                    {
                        result[i] = temp.Substring(1, temp.Length - 2);
                    }
                    else
                    {
                        builder.Length = 0;
                        builder.Append(result[i]);
                        result.RemoveAt(i);
                    }
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

        public IEnumerable<Product> Fetch(int start, int count, IDictionary<string, object> filter)
        {
            return inventoryRepository.Fetch(start, count, filter);
        }

        public int Count(IDictionary<string, object> filter)
        {
            return inventoryRepository.Count(filter);
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

        public IEnumerable<Product> FetchByCategories(int start, int count, string[] categories)
        {
            return inventoryRepository.FetchByCategories(start, count, categories);
        }

    }
}



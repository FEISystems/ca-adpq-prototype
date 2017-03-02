using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ca_service.Database;

namespace ca_service.Entities
{
    [DbTable("ca.products")]
    public class Product : Entity
    {
        public Product(int id) : base(id)
        {

        }

        [DbColumn(System.Data.DbType.String)]
        public string CLIN { get; set; }

        [DbColumn(System.Data.DbType.String, IsOptional =true)]
        public string UNSPSC { get; set; }

        [DbColumn(System.Data.DbType.String)]
        public string Description { get; set; }

        [DbColumn(System.Data.DbType.String)]
        public string UnitOfMeasure { get; set; }

        [DbColumn(System.Data.DbType.String)]
        public string QuantityPerUnitOfMeasure { get; set; }

        [DbColumn(System.Data.DbType.String)]
        public string ContractDiscount { get; set; }

        [DbColumn(System.Data.DbType.String)]
        public string ContractNumber { get; set; }

        [DbColumn(System.Data.DbType.String)]
        public string Contractor { get; set; }

        [DbColumn(System.Data.DbType.DateTime)]
        public DateTime ContractExpiration { get; set; }

        [DbColumn(System.Data.DbType.String)]
        public string Title { get; set; }

        [DbColumn(System.Data.DbType.Currency)]
        public decimal ListPrice { get; set; }

        [DbColumn(System.Data.DbType.Currency)]
        public decimal ContractPrice { get; set; }

        [DbColumn(System.Data.DbType.String)]
        public string Manufacturer { get; set; }

        [DbColumn(System.Data.DbType.String)]
        public string ManufacturerPartNumber { get; set; }

        [DbColumn(System.Data.DbType.String)]
        public string SKU { get; set; }

        [DbColumn(System.Data.DbType.String)]
        public string ProductType { get; set; }

        [DbColumn(System.Data.DbType.String)]
        public string Category { get; set; }

        [DbColumn(System.Data.DbType.String, IsOptional = true)]
        public string ImageFileName { get; set; }
    }

    public enum ProductType
    {
        Hardware = 1,
        Software = 2,
        Service = 3
    }

    public enum UnitOfMeasure
    {
        EACH = 1,
        HOUR = 2,
    }


    
}

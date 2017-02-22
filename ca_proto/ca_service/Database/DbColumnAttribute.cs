using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Reflection;
using System.Data;

namespace ca_service.Database
{
    [System.AttributeUsage(System.AttributeTargets.Property, Inherited = false, AllowMultiple = false)]
    public class DbColumnAttribute : Attribute
    {
        private readonly System.Data.DbType dbType;
        private PropertyInfo property;
        private string columnName;

        public DbColumnAttribute(System.Data.DbType dbType)
        {
            this.dbType = dbType;
            IsIdentity = false;
            IsOptional = false;
        }

        // This is not currently used - identity column Id is assumed
        public bool IsIdentity { get; set; }

        public System.Data.DbType DbType
        {
            get
            {
                return dbType;
            }
        }

        public PropertyInfo Property
        {
            get { return property; }
        }

        public string ColumnName
        {
            get { return columnName; }
        }

        public MySql.Data.MySqlClient.MySqlParameter BuildParameter(MySql.Data.MySqlClient.MySqlCommand cmd)
        {
            return cmd.Parameters.Add("@" + columnName, DbType);
        }

        public static IEnumerable<DbColumnAttribute> Get(Type type)
        {
            var info = type.GetTypeInfo();
            var props = info.GetProperties();
            foreach (var prop in props)
            {
                var attr = prop.GetCustomAttribute<DbColumnAttribute>();
                if (attr != null)
                {
                    attr.property = prop;
                    attr.columnName = prop.Name;
                    yield return attr;
                }
            }
        }

        public bool IsOptional { get; set; }
    }
}
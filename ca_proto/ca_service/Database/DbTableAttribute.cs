using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Reflection;

namespace ca_service.Database
{
    [System.AttributeUsage(System.AttributeTargets.Class, Inherited = false, AllowMultiple = false)]
    public class DbTableAttribute : Attribute
    {
        private readonly string tableName;
        public DbTableAttribute(string tableName)
        {
            this.tableName = tableName;
        }
        public string TableName { get { return tableName; } }

        public static DbTableAttribute Get(Type type)
        {
            var info = type.GetTypeInfo();
            return info.GetCustomAttribute<DbTableAttribute>();
        }

    }
}

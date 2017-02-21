using ca_service.Database;
using ca_service.Entities;
using Microsoft.Extensions.Configuration;
using MySql.Data.MySqlClient;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ca_service.Repositories
{
    public abstract class EntityRepository<EntityType>: IDisposable where EntityType : Entity
    {
        protected Connection db;
        protected EntityRepository(IConfiguration configuration)
        {
            this.db = new Connection(configuration);
            this.OrderAscending = true;
        }

        public void Dispose()
        {
            if (null != db)
            {
                db.Dispose();
                db = null;
            }
        }

        private static readonly object commandSection = new object();
        private static string tableName = null;
        private static string TableName
        {
            get
            {
                if (null == tableName)
                {
                    lock (commandSection)
                    {
                        if (null == tableName)
                        {
                            tableName = DbTableAttribute.Get(typeof(EntityType)).TableName;
                        }
                    }                    
                }
                return tableName;
            }
        }

        private static List<DbColumnAttribute> columns = null;
        public static List<DbColumnAttribute> Columns
        {
            get
            {
                if (null == columns)
                {
                    lock (commandSection)
                    {
                        if (null == columns)
                        {
                            columns = DbColumnAttribute.Get(typeof(EntityType)).ToList();
                        }
                    }
                }
                if (columns.Count == 0)
                    throw new Exception(string.Format("The type {0} does not contain any database columns.", typeof(EntityType).Name));
                return columns;
            }
        }

        //todo: add mechanism to insert converted column data
        private static string insertCommandText = null;
        private static string InsertCommandText
        {
            get
            {
                if (null == insertCommandText)
                {
                    lock (commandSection)
                    {
                        if (null == insertCommandText)
                        {
                            System.Text.StringBuilder sql = new System.Text.StringBuilder();
                            sql.AppendFormat("insert into {0} (", TableName);
                            sql.AppendFormat("{0}", Columns[0].ColumnName);
                            for (int i = 1; i < Columns.Count; i++)
                            {
                                sql.AppendFormat(", {0}", Columns[i].ColumnName);
                            }
                            sql.Append(")\r\n values (");
                            sql.AppendFormat("@{0}", Columns[0].ColumnName);
                            for (int i = 1; i < Columns.Count; i++)
                            {
                                sql.AppendFormat(", @{0}", Columns[i].ColumnName);
                            }
                            sql.AppendLine(");");
                            sql.AppendLine("SELECT LAST_INSERT_ID();");
                            insertCommandText = sql.ToString();
                        }
                    }
                }
                return insertCommandText;
            }
        }

        //todo: add mechanism to edit converted column data
        private static string editCommandText = null;
        private static string EditCommandText
        {
            get
            {
                if (null == editCommandText)
                {
                    lock(commandSection)
                    {
                        if (null == editCommandText)
                        {
                            System.Text.StringBuilder sql = new System.Text.StringBuilder();
                            sql.Append("update ");
                            sql.AppendLine(TableName);
                            sql.AppendFormat("  set {0} = @{0}", Columns[0].ColumnName);
                            for (int i = 1; i < Columns.Count; i++)
                            {
                                sql.AppendFormat(",\r\n  {0} = @{0}", Columns[i].ColumnName);
                            }
                            sql.Append("\r\n where Id = @Id");
                            editCommandText = sql.ToString();
                        }
                    }
                }
                return editCommandText;
            }

        }

        public void Add(EntityType entity)
        {
            if (null == entity)
                return;
            using (var cmd = db.connection.CreateCommand() as MySqlCommand)
            {
                cmd.CommandText = InsertCommandText;
                BuildCommonParameters(cmd, entity);
                var id = (ulong)cmd.ExecuteScalar();
                entity.Id = (int)id;
            }
        }

        private void BuildCommonParameters(MySqlCommand cmd, EntityType entity)
        {
            foreach (var column in Columns)
            {
                if (column.DbType == System.Data.DbType.String && column.Property.PropertyType == typeof(List<int>))
                {
                    var o = column.Property.GetValue(entity);
                    if (null == o)
                        column.BuildParameter(cmd).Value = "";
                    else
                        column.BuildParameter(cmd).Value = string.Join(",", ((List<int>)o).Select(item => item.ToString()).ToArray());
                }
                else
                {
                    column.BuildParameter(cmd).Value = column.Property.GetValue(entity);
                }
            }
        }

        public void Update(EntityType entity)
        {
            if (null == entity)
                return;
            using (var cmd = db.connection.CreateCommand() as MySqlCommand)
            {
                cmd.CommandText = EditCommandText;
                BuildCommonParameters(cmd, entity);
                cmd.Parameters.Add("@Id", System.Data.DbType.Int32).Value = entity.Id;
                cmd.ExecuteNonQuery();
            }
        }

        public void Delete(int id)
        {
            using (var cmd = db.connection.CreateCommand() as MySqlCommand)
            {
                cmd.CommandText = string.Format("delete from {0} where id = @id", TableName);
                cmd.Parameters.Add("@Id", System.Data.DbType.Int32).Value = id;
                cmd.ExecuteNonQuery();
            }
        }

        //todo: include filtering and paging
        private string orderColumnName = "Id";
        public string OrderColumnName
        {
            get { return orderColumnName; }
            set
            {
                if (null == value || !Columns.Exists(item => value.Equals(item.ColumnName, StringComparison.OrdinalIgnoreCase)))
                    orderColumnName = "Id";
                orderColumnName = value;
            }
        }

        public bool OrderAscending { get; set; }

        public List<EntityType> Fetch(int start, int count)
        {
            //SELECT * FROM ca.categories order by id desc LIMIT 0, 1000
            using (var cmd = db.connection.CreateCommand() as MySqlCommand)
            {
                cmd.CommandText = string.Format("select * from {0} order by {1} {2} limit {3}, {4}", TableName, OrderColumnName, (OrderAscending ? "asc" : "desc"), start, count);
                using (var reader = cmd.ExecuteReader() as MySqlDataReader)
                {
                    List<EntityType> result = new List<EntityType>();
                    while (reader.Read())
                    {
                        result.Add(ReadEntity(reader));
                    }
                    return result;
                }
            }
        }

        /// <summary>
        /// override in sub-classes to convert properties if necessary
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public virtual EntityType Get(int id)
        {
            using (var cmd = db.connection.CreateCommand() as MySqlCommand)
            {
                cmd.CommandText = string.Format("select * from {0} where Id = {1}", TableName, id);
                using (var reader = cmd.ExecuteReader() as MySqlDataReader)
                {
                    if (reader.Read())
                    {
                        EntityType result = ReadEntity(reader);
                        return result;
                    }
                }
            }
            return null;
        }

        protected virtual EntityType ReadEntity(MySqlDataReader reader)
        {
            EntityType result = Activator.CreateInstance(typeof(EntityType), reader["Id"]) as EntityType;
            foreach (var column in Columns)
            {
                if (column.DbType == System.Data.DbType.String && column.Property.PropertyType == typeof(List<int>))
                {
                    var values = reader[column.ColumnName] as string;
                    if (null == values)
                    {
                        column.Property.SetValue(result, new List<int>(0));
                    }
                    else
                    {
                        var list = new List<int>(values.Split(new char[] { ',' }, StringSplitOptions.RemoveEmptyEntries).Select(item => int.Parse(item)));
                        column.Property.SetValue(result, list);
                    }
                }
                else
                {
                    column.Property.SetValue(result, reader[column.ColumnName]);
                }
            }
            return result;
        }
    }
}

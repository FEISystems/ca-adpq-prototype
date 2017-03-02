using ca_service.Database;
using ca_service.Entities;
using ca_service.Interfaces;
using Microsoft.Extensions.Configuration;
using MySql.Data.MySqlClient;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ca_service.Repositories
{
    public abstract class EntityRepository<EntityType>: IEntityRepository where EntityType : Entity
    {
        protected readonly IConfiguration _configuration;

        protected EntityRepository(IConfiguration configuration)
        {
            _configuration = configuration;
            this.OrderAscending = true;
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

            using (var db = new Connection(_configuration))
            {
                using (var cmd = db.connection.CreateCommand() as MySqlCommand)
                {
                    cmd.CommandText = InsertCommandText;
                    BuildCommonParameters(cmd, entity);
                    var id = (ulong)cmd.ExecuteScalar();
                    entity.Id = (int)id;
                }
            }
        }

        private void BuildCommonParameters(MySqlCommand cmd, EntityType entity)
        {
            foreach (var column in Columns)
            {
                BuildColumnParameter(column, cmd, entity);
            }
        }

        private void BuildColumnParameter(DbColumnAttribute column, MySqlCommand cmd, EntityType entity)
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
                object value = column.Property.GetValue(entity);
                if (null == value && column.IsOptional)
                {
                    switch (column.DbType)
                    {
                        case System.Data.DbType.String: value = ""; break;
                        case System.Data.DbType.Currency: value = 0.0m; break;
                        case System.Data.DbType.Int32: value = 0; break;
                    }
                }
                column.BuildParameter(cmd).Value = value;
            }
        }

        public void Update(EntityType entity)
        {
            if (null == entity)
                return;

            using (var db = new Connection(_configuration))
            {
                using (var cmd = db.connection.CreateCommand() as MySqlCommand)
                {
                    cmd.CommandText = EditCommandText;
                    BuildCommonParameters(cmd, entity);
                    cmd.Parameters.Add("@Id", System.Data.DbType.Int32).Value = entity.Id;
                    cmd.ExecuteNonQuery();
                }
            }
        }

        public void Delete(int id)
        {
            using (var db = new Connection(_configuration))
            {
                using (var cmd = db.connection.CreateCommand() as MySqlCommand)
                {
                    cmd.CommandText = string.Format("delete from {0} where id = @id", TableName);
                    cmd.Parameters.Add("@Id", System.Data.DbType.Int32).Value = id;
                    cmd.ExecuteNonQuery();
                }
            }
        }

        public int DeleteAll()
        {
            using (var db = new Connection(_configuration))
            {
                using (var cmd = db.connection.CreateCommand() as MySqlCommand)
                {
                    cmd.CommandText = string.Format("delete from {0} where ID <> 0", TableName);
                    return cmd.ExecuteNonQuery();
                }
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
                else
                    orderColumnName = value;
            }
        }

        public bool OrderAscending { get; set; }

        /// <summary>
        /// override in sub-classes to convert properties if necessary
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public virtual EntityType Get(int id)
        {
            using (var db = new Connection(_configuration))
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
            }

            return null;
        }

        protected virtual EntityType ReadEntity(MySqlDataReader reader)
        {
            List<string> selectedFields = GetFieldNames(reader);
            EntityType result = Activator.CreateInstance(typeof(EntityType), reader["Id"]) as EntityType;
            foreach (var column in Columns)
            {
                if (!selectedFields.Contains(column.ColumnName.ToLower()))
                    continue;
                if (column.DbType == System.Data.DbType.String)
                {
                    var value = reader[column.ColumnName] as string;
                    if (column.Property.PropertyType == typeof(List<int>))
                    {
                        if (null == value)
                        {
                            column.Property.SetValue(result, new List<int>(0));
                        }
                        else
                        {
                            var list = new List<int>(value.Split(new char[] { ',' }, StringSplitOptions.RemoveEmptyEntries).Select(item => int.Parse(item)));
                            column.Property.SetValue(result, list);
                        }
                    }
                    else
                    {                        
                        column.Property.SetValue(result, CleanText(value));
                    }
                }
                else
                {
                    column.Property.SetValue(result, reader[column.ColumnName]);
                }
            }
            return result;
        }

        private string CleanText(string value)
        {
            char[] chars = value.ToCharArray();
            for (int i=0; i<value.Length; i++)
            {
                if (chars[i] > 127)
                    chars[i] = ' ';
            }
            return new string(chars);
        }

        private List<string> GetFieldNames(MySqlDataReader reader)
        {
            var result = new List<string>();
            for (int i=0; i<reader.FieldCount; i++)
            {
                result.Add(reader.GetName(i).ToLower());
            }
            return result;
        }

        /// <summary>
        /// Selects records exactly matching the data in the provided entity
        /// </summary>
        /// <param name="entity"></param>
        /// <param name="columnNames"></param>
        /// <returns></returns>
        public IEnumerable<EntityType> Where(EntityType entity, params string[] columnNames)
        {
            if (null == columnNames || columnNames.Length == 0)
                yield break;
            List<DbColumnAttribute> filterColumns = new List<DbColumnAttribute>();
            foreach (string columnName in columnNames)
            {
                DbColumnAttribute column = Columns.Where(item => item.ColumnName.Equals(columnName, StringComparison.OrdinalIgnoreCase)).FirstOrDefault();
                if (null == column)
                    yield break;
                filterColumns.Add(column);
            }

            using (var db = new Connection(_configuration))
            {
                using (var cmd = db.connection.CreateCommand() as MySqlCommand)
                {
                    StringBuilder sqlBuilder = new StringBuilder();
                    DbColumnAttribute column = filterColumns[0];
                    sqlBuilder.AppendFormat("select * from {0} where {1} = @{1}", TableName, column.ColumnName);
                    BuildColumnParameter(column, cmd, entity);
                    for (int i = 1; i < filterColumns.Count; i++)
                    {
                        column = filterColumns[i];
                        sqlBuilder.AppendFormat(" and {0} = @{0}", column.ColumnName);
                        BuildColumnParameter(column, cmd, entity);
                    }
                    cmd.CommandText = sqlBuilder.ToString();
                    using (var reader = cmd.ExecuteReader() as MySqlDataReader)
                    {
                        while (reader.Read())
                        {
                            yield return ReadEntity(reader);
                        }
                    }
                }
            }
        }

        public List<EntityType> Fetch(int start, int count)
        {
            //SELECT * FROM ca.categories order by id desc LIMIT 0, 1000

            using (var db = new Connection(_configuration))
            {
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
        }

        /// <summary>
        /// Selects records using partial matching of data. Supports paging through a large number of records.
        /// </summary>
        /// <param name="start"></param>
        /// <param name="count"></param>
        /// <param name="filter"></param>
        /// <returns></returns>
        public IEnumerable<EntityType> Fetch(int start, int count, IDictionary<string, object> filter)
        {
            if (null == filter || filter.Count == 0)
            {
                foreach (EntityType entity in Fetch(start, count))
                    yield return entity;
                yield break;
            }
            string[] keys = filter.Keys.ToArray();
            List<DbColumnAttribute> filterColumns = new List<DbColumnAttribute>();
            foreach (string columnName in keys)
            {
                DbColumnAttribute column = Columns.Where(item => item.ColumnName.Equals(columnName, StringComparison.OrdinalIgnoreCase)).FirstOrDefault();
                if (null == column)
                    yield break;
                filterColumns.Add(column);
            }

            using (var db = new Connection(_configuration))
            {
                using (var cmd = db.connection.CreateCommand() as MySqlCommand)
                {
                    StringBuilder sqlBuilder = new StringBuilder();
                    sqlBuilder.AppendFormat("select * from {0} where ", TableName);
                    BuildLikeParameter(cmd, sqlBuilder, filterColumns[0], filter[keys[0]]);
                    for (int i = 1; i < filterColumns.Count; i++)
                    {
                        sqlBuilder.Append(" AND ");
                        BuildLikeParameter(cmd, sqlBuilder, filterColumns[i], filter[keys[i]]);
                    }
                    sqlBuilder.AppendFormat(" order by {0} {1} limit {2}, {3}", OrderColumnName, (OrderAscending ? "asc" : "desc"), start, count);
                    cmd.CommandText = sqlBuilder.ToString();
                    using (var reader = cmd.ExecuteReader() as MySqlDataReader)
                    {
                        while (reader.Read())
                        {
                            yield return ReadEntity(reader);
                        }
                    }
                }
            }
        }

        private static string ConvertToParamName(string s)
        {
            if (string.IsNullOrEmpty(s))
                return "";
            var result = new StringBuilder(s);
            for (int i = 0; i < result.Length; i++)
            {
                var c = result[i];
                if (!CharIsInRange(c, 'a', 'z') && !CharIsInRange(c, 'A', 'Z') && !CharIsInRange(c, '0', '9'))
                    result[i] = '_';
            }
            if (CharIsInRange(result[0], '0', '9'))
                result.Insert(0, '_');
            return result.ToString();
        }

        private static bool CharIsInRange(char c, char low, char high)
        {
            return low <= c && c <= high;
        }

        private void BuildLikeParameter(MySqlCommand cmd, StringBuilder sqlBuilder, DbColumnAttribute column, object value)
        {
            if (column.DbType == System.Data.DbType.String)
            {
                var s = value as string;
                if (null != s)// && s.Contains("|"))
                {
                    string[] values = s.Split(new char[] { '|' }, StringSplitOptions.RemoveEmptyEntries).Distinct().ToArray();
                    if (values.Length != 0)
                    {
                        sqlBuilder.Append("(");
                        try
                        {
                            string paramName = "@" + ConvertToParamName(values[0]);
                            BuildFuzzyOrLiteralCommand(sqlBuilder, cmd, paramName, column, values[0]);
                            for (int i = 1; i < values.Length; i++)
                            {
                                sqlBuilder.Append(" OR ");
                                paramName = "@" + ConvertToParamName(values[i]);
                                BuildFuzzyOrLiteralCommand(sqlBuilder, cmd, paramName, column, values[i]);
                            }
                        }
                        finally
                        {
                            sqlBuilder.Append(")");
                        }
                        return;
                    }
                }
            }
            else if (column.DbType == System.Data.DbType.Currency)
            {
                //todo: it will be a string if it is separated by a character
                var s = value as string;
                if (null != s)
                {
                    string[] minMax = s.Split(new char[] { '-', ':', '|' }, StringSplitOptions.RemoveEmptyEntries);
                    if (minMax.Length == 2)
                    {
                        decimal min = decimal.Parse(minMax[0], System.Globalization.NumberStyles.Currency);
                        decimal max = decimal.Parse(minMax[1], System.Globalization.NumberStyles.Currency);
                        sqlBuilder.AppendFormat("(@Min{0} <= {0} AND {0} <= @Max{0})", column.ColumnName);
                        cmd.Parameters.Add("@Min" + column.ColumnName, column.DbType).Value = min;
                        cmd.Parameters.Add("@Max" + column.ColumnName, column.DbType).Value = max;
                        return;
                    }
                }
            }
            sqlBuilder.AppendFormat("{0} = @{0}", column.ColumnName);
            column.BuildParameter(cmd).Value = value;
        }

        //todo: eventually include a fuzzy property in the query object and only switch to like if fuzzy is true
        private void BuildFuzzyOrLiteralCommand(StringBuilder sqlBuilder, MySqlCommand cmd, string paramName, DbColumnAttribute column, string value)
        {
            if (value != null && value.Contains("%"))
            {
                sqlBuilder.AppendFormat("{0} like {1}", column.ColumnName, paramName);
            }
            else
            {
                sqlBuilder.AppendFormat("{0} = {1}", column.ColumnName, paramName);
            }
            cmd.Parameters.Add(paramName, column.DbType).Value = value;
        }

        public int Count(IDictionary<string, object> filter)
        {
            string[] keys = null;
            if (null != filter)
                keys = filter.Keys.ToArray();
            List<DbColumnAttribute> filterColumns = new List<DbColumnAttribute>();
            foreach (string columnName in keys)
            {
                DbColumnAttribute column = Columns.Where(item => item.ColumnName.Equals(columnName, StringComparison.OrdinalIgnoreCase)).FirstOrDefault();
                if (null == column)
                    return 0;
                filterColumns.Add(column);
            }

            using (var db = new Connection(_configuration))
            {
                using (var cmd = db.connection.CreateCommand() as MySqlCommand)
                {
                    StringBuilder sqlBuilder = new StringBuilder();
                    sqlBuilder.AppendFormat("select count('x') from {0}", TableName);
                    if (null != filter && filter.Count != 0)
                    {
                        sqlBuilder.Append(" where ");
                        BuildLikeParameter(cmd, sqlBuilder, filterColumns[0], filter[keys[0]]);
                        for (int i = 1; i < filterColumns.Count; i++)
                        {
                            sqlBuilder.Append(" AND ");
                            BuildLikeParameter(cmd, sqlBuilder, filterColumns[i], filter[keys[i]]);
                        }
                    }
                    cmd.CommandText = sqlBuilder.ToString();
                    long result = (long)cmd.ExecuteScalar();
                    return (int)result;
                }
            }
        }
    }
}

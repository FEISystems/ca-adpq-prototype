using ca_service.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ca_service.Entities;
using Microsoft.Extensions.Configuration;
using ca_service.Database;

namespace ca_service.Services
{
    public class ReportService : IReportService, IDisposable
    {
        private Connection db;

        public ReportService(IConfiguration configuration)
        {
            db = new Connection(configuration);
        }

        public void Dispose()
        {
            if (null != db)
            {
                db.Dispose();
                db = null;
            }
        }

        public IEnumerable<OrderProduct> GetOrderProducts(DateTime start, DateTime end)
        {
            using (var command = db.connection.CreateCommand() as MySql.Data.MySqlClient.MySqlCommand)
            {
                command.CommandText = string.Format(OrderProduct.Query, start, end);
                command.Parameters.Add("@StartDate", System.Data.DbType.DateTime).Value = start;
                command.Parameters.Add("@EndDate", System.Data.DbType.DateTime).Value = end;
                using (var reader = command.ExecuteReader() as MySql.Data.MySqlClient.MySqlDataReader)
                {
                    while (reader.Read())
                    {
                        yield return OrderProduct.Read(reader);
                    }
                }
            }
        }
    }
}

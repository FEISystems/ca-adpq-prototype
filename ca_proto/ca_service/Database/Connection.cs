using Microsoft.Extensions.Configuration;
using MySql.Data.MySqlClient;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ca_service.Database
{
    public class Connection : IDisposable
    {
        public readonly MySqlConnection connection;
        //https://mysql-net.github.io/MySqlConnector/overview/configuration/
        public Connection(string connectionString)
        {
            connection = new MySqlConnection(connectionString);
            connection.Open();
        }

        public Connection(IConfiguration configuration)
        {
            var connectionString = configuration.GetSection("connectionString");
            connection = new MySqlConnection(connectionString.Value);
            connection.Open();
        }

        public void Dispose()
        {
            connection.Close();
        }
    }
}

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
            //TODO: Make the connection configurable from config file
            var conStr = "host=127.0.0.1;port=3306;user id=sa;password=password$1;database=ca";
            connection = new MySqlConnection(conStr);
            connection.Open();
        }

        public void Dispose()
        {
            connection.Close();
        }
    }
}

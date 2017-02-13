using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ca_service.Interfaces;
using ca_service.Database;
using ca_service.Entities;
using Microsoft.Extensions.Configuration;

namespace ca_service.Services
{
    public class UserService : IUserService, IDisposable
    {
        private readonly Connection db;
        public UserService(IConfiguration configuration)
        {
            db = new Connection(configuration);
        }

        public void Dispose()
        {
            db.Dispose();
        }

        public List<User> GetUsers()
        {
            var users = new List<User>();

            var cmd = db.connection.CreateCommand();
            cmd.CommandText = "Select Id, Name, Password from users";
            using (var reader = cmd.ExecuteReader())
            {
                while (reader.Read())
                {
                    users.Add(new User((int)reader["Id"])
                    {
                        Name = reader["Name"].ToString(),
                        Password = reader["Password"].ToString()

                    });
                }
            }

            return users;
        }
    }
}

using ca_service.Database;
using ca_service.Entities;
using ca_service.Interfaces;
using Microsoft.Extensions.Configuration;
using MySql.Data.MySqlClient;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ca_service.Repositories
{
    public class UserRepository: IUserRepository, IDisposable
    {
        private readonly Connection db;
        public UserRepository(IConfiguration configuration)
        {
            db = new Connection(configuration);
        }
        public User GetUser(string username)
        {
            User user = null;
            var cmd = db.connection.CreateCommand();
            cmd.CommandText = $"Select Id, UserName, IsAdmin,TimeZoneOffset, Password from users where UserName=@UserName";
            cmd.Parameters.Add(new MySqlParameter() { ParameterName = "@UserName", Value = username });
            using (var reader = cmd.ExecuteReader())
            {
                while (reader.Read())
                {
                    user = new User((int)reader["Id"])
                    {
                        UserName = reader["UserName"].ToString(),
                        Password = reader["Password"].ToString(),
                        IsAdmin = (bool)reader["IsAdmin"],
                        TimeZoneOffset = (int)reader["TimeZoneOffset"]
                    };
                }
            }
            return user;
        }

        public List<User> GetUsers()
        {
            var users = new List<User>();

            var cmd = db.connection.CreateCommand();
            cmd.CommandText = "Select Id, UserName, IsAdmin,TimeZoneOffset, Password from users";
            using (var reader = cmd.ExecuteReader())
            {
                while (reader.Read())
                {
                    users.Add(new User((int)reader["Id"])
                    {
                        UserName = reader["UserName"].ToString(),
                        Password = reader["Password"].ToString()

                    });
                }
            }

            return users;
        }

        public User CreateUser(string username, string password, int timeZoneOffset, bool isAdmin)
        {
            var currentUser = GetUser(username);
            if (currentUser != null)
                return currentUser;
            var cmd = db.connection.CreateCommand();
            cmd.Parameters.Add(new MySqlParameter() { ParameterName = "@UserName", Value = username});
            cmd.Parameters.Add(new MySqlParameter() { ParameterName = "@Password", Value = password });
            cmd.Parameters.Add(new MySqlParameter() { ParameterName = "@IsAdmin", Value = isAdmin });
            cmd.Parameters.Add(new MySqlParameter() { ParameterName = "@TimeZoneOffset", Value = timeZoneOffset });
            cmd.CommandText = $"INSERT INTO users (UserName, Password, IsAdmin,TimeZoneOffset ) VALUES (@UserName,@Password, @IsAdmin, @TimeZoneOffset);";
            cmd.ExecuteNonQuery();
            return GetUser(username);
        }

        public void Dispose()
        {
            db.Dispose();
        }
    }
}

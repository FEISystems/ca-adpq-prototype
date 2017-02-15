using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ca_service.Interfaces;
using ca_service.Database;
using ca_service.Entities;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Caching.Memory;

namespace ca_service.Services
{
    public class UserService : IUserService, IDisposable
    {
        private readonly Connection db;
        private readonly IMemoryCache memoryCache;
        public UserService(IConfiguration configuration, IMemoryCache memoryCache)
        {
            db = new Connection(configuration);
            this.memoryCache = memoryCache;
        }

        public bool IsAuthenticated(string token)
        {
            Login login;
            var success = this.memoryCache.TryGetValue(token, out login);
            if (!success || login == null)
                return false;
            return true;
        }

        public Login Authenticate(string username, string password)
        {
            Login login = new Login();

            User user = GetUser(username);
            if (user != null && user.Password == password)
            {
                login.Token = Guid.NewGuid().ToString();
                login.Message = "Success";
                this.memoryCache.Set(login.Token, login);
            }
            

            if (String.IsNullOrEmpty(login.Token))
                login.Message = "Login Failed";

            return login;
        }

        public void Dispose()
        {
            db.Dispose();
        }

        public User GetUser(string username)
        {
            User user = null;
            var cmd = db.connection.CreateCommand();
            cmd.CommandText = $"Select Id, Name, Password from users where Name='{username}'";
            using (var reader = cmd.ExecuteReader())
            {
                while (reader.Read())
                {
                    user = new User((int)reader["Id"])
                    {
                        Name = reader["Name"].ToString(),
                        Password = reader["Password"].ToString()

                    };
                }
            }
            return user;
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

        public User CreateUser(string username, string password)
        {
            var currentUser = GetUser(username);
            if (currentUser != null)
                return currentUser;
            var cmd = db.connection.CreateCommand();
            cmd.CommandText = $"INSERT INTO ca.users (Name, Password ) VALUES ('{username}','{password}' );";
            cmd.ExecuteNonQuery();
            return GetUser(username);
        }
    }

    
}

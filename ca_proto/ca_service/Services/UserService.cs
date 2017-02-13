using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ca_service.Interfaces;
using ca_service.Database;
using ca_service.Entities;
namespace ca_service.Services
{
    public class UserService : IUserService
    {

        public List<User> GetUsers()
        {
            var users = new List<User>();
            using (var db = new Connection(string.Empty))
            {
                var cmd = db.connection.CreateCommand();
                cmd.CommandText = "Select UserId, Name, Password from users";
                using (var reader = cmd.ExecuteReader())
                {
                    while (reader.Read())
                    {
                        users.Add(new User((int)reader["UserId"])
                        {
                            Name = reader["Name"].ToString(),
                            Password = reader["Password"].ToString()

                        });                        
                    }
                }
            }
            return users;
        }
    }
}

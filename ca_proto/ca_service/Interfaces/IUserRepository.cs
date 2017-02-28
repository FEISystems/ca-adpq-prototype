using ca_service.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ca_service.Interfaces
{
    public interface IUserRepository
    {
        User GetUser(string username);
        User CreateUser(string username, string password, int timeZoneOffset, bool isAdmin);
        List<User> GetUsers();
    }
}

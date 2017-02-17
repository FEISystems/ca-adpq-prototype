using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ca_service.Entities;
namespace ca_service.Interfaces
{
    public interface IUserService
    {
        List<User> GetUsers();
        Login Authenticate(string username, string password);
        bool IsAuthenticated(string token);
        bool IsAuthenticatedAdmin(string token);
        User CreateUser(string username, string password, int timeZoneOffset, bool isAdmin);
        void LogOut(string token);
    }
}

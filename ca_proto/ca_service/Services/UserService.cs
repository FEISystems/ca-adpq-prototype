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
    public class UserService : IUserService
    {
        
        private readonly IMemoryCache memoryCache;
        private readonly IUserRepository userRepository;
        public UserService(IUserRepository userRepository, IMemoryCache memoryCache)
        {
            this.memoryCache = memoryCache;
            this.userRepository = userRepository;
        }

        public bool IsAuthenticated(string token)
        {
            Login login;
            var success = this.memoryCache.TryGetValue(token, out login);
            if (!success || login == null)
                return false;
            return true;
        }

        public bool IsAuthenticatedAdmin(string token)
        {
            Login login;
            var success = this.memoryCache.TryGetValue(token, out login);
            if (!success || login == null)
                return false;
            return login.IsAdmin;
        }


        public Login Authenticate(string username, string password)
        {
            Login login = new Login();

            User user = userRepository.GetUser(username);
            if (user != null && user.Password == password)
            {
                login.Token = Guid.NewGuid().ToString();
                login.Message = "Success";
                login.IsAdmin = user.IsAdmin;
                this.memoryCache.Set(login.Token, login);
            }
            

            if (String.IsNullOrEmpty(login.Token))
                login.Message = "Login Failed";

            return login;
        }

        public List<User> GetUsers()
        {
            return userRepository.GetUsers();
        }

        public User CreateUser(string username, string password, int timeZoneOffset, bool isAdmin)
        {
            return userRepository.CreateUser(username, password, timeZoneOffset, isAdmin);
        }
    }

    
}

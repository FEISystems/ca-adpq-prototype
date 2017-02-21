using ca_service.Entities;
using ca_service.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace ca_proto.Helpers
{
    public static class Helpers
    {
        public static string AuthToken = "AuthToken";
        public static ContentResult GetContentResult(object result, string message)
        {
            var actualResult = result as ContentResult;
            var content = message;

            if (actualResult != null)
            {
                content += ", " + actualResult.Content;
            }

            return new ContentResult()
            {
                Content = content,
                ContentType = "text/html"
            };
        }

        public static int? GetUserId(this HttpContext context)
        {
            IUserService userService = (IUserService)context.RequestServices.GetService(typeof(IUserService));
            var request = context.Request;
            var token = string.Empty;
            if (request.Cookies.Any(x => x.Key == AuthToken))
            {
                token = request.Cookies.First(x => x.Key == AuthToken).Value.ToString();
            }
            var login = userService.GetLogin(token);

            if (login != null)
                return login.UserId;
            return null;
        }

        public static T GetEntityFromRequest<T>(this HttpRequest request)
        {
            string data;
            using (StreamReader sr = new StreamReader(request.Body))
            {
                data = sr.ReadToEnd();
            }
            return Deserialize<T>(data);
        }

        public static T Deserialize<T>(string serialData)
        {
            if (String.IsNullOrEmpty(serialData))
                throw new ArgumentException("serialData is null or empty.", "serialData");
            string data = serialData;

            return JsonConvert.DeserializeObject<T>(
                data,
                new JsonSerializerSettings
                {
                    NullValueHandling = NullValueHandling.Ignore,
                    MissingMemberHandling = MissingMemberHandling.Ignore
                });
        }
    }
}

using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ca_proto.Helpers;
using ca_service.Interfaces;
using Microsoft.AspNetCore.Mvc.Filters;

namespace ca_proto.Filters
{
    public class AdministratorFilter : ActionFilterAttribute
    {
        public override void OnActionExecuting(ActionExecutingContext context)
        {
            IUserService userService = (IUserService)context.HttpContext.RequestServices.GetService(typeof(IUserService));
            var request = context.HttpContext.Request;
            if (request.Cookies.Any(x => x.Key == Helpers.Helpers.AuthToken))
            {
                var token = request.Cookies.First(x => x.Key == Helpers.Helpers.AuthToken).Value.ToString();
                if (userService.IsAuthenticatedAdmin(token))
                    return;
                throw new UnauthorizedAccessException();
            }
            throw new UnauthorizedAccessException();
        }

    }
}

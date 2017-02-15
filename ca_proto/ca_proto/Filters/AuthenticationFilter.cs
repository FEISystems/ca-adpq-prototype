using Microsoft.AspNetCore.Mvc.Filters;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ca_proto.Helpers;
namespace ca_proto.Filters
{
    public class AuthenticationFilter
    {
        public class SampleGlobalActionFilter : IActionFilter
        {
            public void OnActionExecuting(ActionExecutingContext context)
            {
                //implement bool IsAuthenticated(string token)
                if (context.ActionDescriptor.DisplayName == "FiltersSample.Controllers.HomeController.Hello")
                {
                    // Manipulating action arguments...
                    if (!context.ActionArguments.ContainsKey("name"))
                    {
                        context.ActionArguments["name"] = "Steve";
                    }
                }
            }

            public void OnActionExecuted(ActionExecutedContext context)
            {
                
            }
        }
    }


}

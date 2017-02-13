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
                if (context.ActionDescriptor.DisplayName == "FiltersSample.Controllers.HomeController.Hello")
                {
                    // Manipulating action result...
                    context.Result = ca_proto.Helpers.Helpers.GetContentResult(context.Result, "FIRST: ");
                }
            }
        }
    }


}

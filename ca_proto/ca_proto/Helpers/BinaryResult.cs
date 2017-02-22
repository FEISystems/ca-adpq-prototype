using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ca_proto.Helpers
{
    public class BinaryResult : ActionResult
    {
        public byte[] Data { get; set; }
        public string FileName { get; set; }
        public string ContentType { get; set; }

        public override void ExecuteResult(ActionContext context)
        {
            context.HttpContext.Response.ContentType = ContentType;
            if (!string.IsNullOrEmpty(FileName))
            {
                context.HttpContext.Response.Headers.Add("content-disposition", "inline;filename=" + FileName);
            }
            context.HttpContext.Response.Body.Write(Data, 0, Data.Length);
        }
    }
}

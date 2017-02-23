using ca_proto.Filters;
using ca_proto.Helpers;
using ca_proto.Models;
using ca_service.Entities;
using ca_service.Interfaces;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ca_proto.Controllers
{
    [Route("api/[controller]")]
    public class ImageController : Controller
    {
        private readonly IImageService imageService;
        public ImageController(IImageService imageService)
        {
            this.imageService = imageService;
        }

        [HttpGet("{imageFileName}")]
        public IActionResult Get(string imageFileName)
        {
            byte[] buffer = imageService.Get(imageFileName);
            if (null != buffer && buffer.Length != 0)
            {
                return new BinaryResult
                {
                    ContentType = GetContentType(imageFileName),
                    Data = buffer,
                    FileName = imageFileName,
                };
            }
            return new EmptyResult();
        }

        private string GetContentType(string imageFileName)
        {
            if (imageFileName.IndexOf(".jpg", StringComparison.OrdinalIgnoreCase) != -1)
            {
                return "image/jpeg";
            }
            if (imageFileName.IndexOf(".png", StringComparison.OrdinalIgnoreCase) != -1)
            {
                return "image/png";
            }
            return "";
        }

        [AdministratorFilter]
        [HttpPost("Add")]
        public IActionResult Add([FromBody]ImportImageData data)
        {
            try
            {
                string fileName = data.ImageFileName;
                if (string.IsNullOrWhiteSpace(GetContentType(data.ImageFileName)))
                    throw new Exception("Invalid file type. Only JPEG and PNG files are supported.");
                var jBuffer = data.Buffer as Newtonsoft.Json.Linq.JObject;
                if (null == jBuffer)
                    throw new Exception("Inbound data is not in the correct format!");
                List<byte> buffer = new List<byte>();
                foreach (var item in jBuffer.Children())
                {
                    var jProp = item as Newtonsoft.Json.Linq.JProperty;
                    if (null == jProp)
                        throw new Exception("Inbound data is not in the correct format!");
                    buffer.Add((byte)jProp.Value);
                }
                imageService.Add(fileName, buffer.ToArray());
                return Json(string.Format("Successfully added {0}", fileName));
            }
            catch (Exception x)
            {
                return Json(new ErrorReport { Error = x.Message });
            }
        }
    }
}

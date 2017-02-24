using ca_service.Entities;
using ca_service.Interfaces;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ca_service.Repositories
{
    public class ImageRepository : EntityRepository<Image>, IImageRepository
    {
        public ImageRepository(IConfiguration configuration):base(configuration)
        {

        }

        public List<Image> Fetch()
        {
            return Fetch(0, int.MaxValue);
        }

        public Image Get(string filename)
        {
            IDictionary<string, object> filter = new Dictionary<string, object>();
            filter.Add("ImageFileName", filename);
            return Fetch(0, 1, filter).FirstOrDefault();
        }
    }
}

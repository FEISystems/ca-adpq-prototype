using ca_service.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ca_service.Interfaces
{
    public interface IImageRepository : IEntityRepository, IDisposable
    {
        void Add(Image image);
        Image Get(string filename);
        List<Image> Fetch();
        int Count(IDictionary<string, object> filter);
    }
}

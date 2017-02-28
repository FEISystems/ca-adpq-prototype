using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ca_service.Interfaces
{
    public interface IImageService
    {
        void Add(string imageFileName, byte[] buffer);
        byte[] Get(string filename);
        string[] GetImageFileNames();
    }
}

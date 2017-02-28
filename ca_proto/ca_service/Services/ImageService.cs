using ca_service.Entities;
using ca_service.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ca_service.Services
{
    public class ImageService : IImageService
    {
        private readonly IImageRepository imageRepository;

        public ImageService(IImageRepository imageRepository)
        {
            this.imageRepository = imageRepository;
        }

        public void Add(string imageFileName, byte[] buffer)
        {
            if (ImageExists(imageFileName))
            {
                throw new Exception("Cannot import item. An image already exists with the name " + imageFileName);
            }
            Image image = new Image(0) { ImageFileName = imageFileName, Buffer = buffer };
            imageRepository.Add(image);
        }

        private bool ImageExists(string imageFileName)
        {
            Dictionary<string, object> filter = new Dictionary<string, object>();
            filter.Add("ImageFileName", imageFileName);
            var count = imageRepository.Count(filter);
            return count != 0;
        }

        public byte[] Get(string filename)
        {
            var image = imageRepository.Get(filename);
            if (null == image)
                return new byte[0];
            return image.Buffer;
        }

        public string[] GetImageFileNames()
        {
            return imageRepository.Fetch().OrderBy(item => item.ImageFileName).Select(item => item.ImageFileName).ToArray();
        }
    }
}
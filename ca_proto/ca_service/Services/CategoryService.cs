using ca_service.Entities;
using ca_service.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ca_service.Services
{
    public class CategoryService : ICategoryService
    {
        private readonly ICategoryRepository categoryRepository;

        public CategoryService(ICategoryRepository categoryRepository)
        {
            this.categoryRepository = categoryRepository;
        }

        public void Add(Category category)
        {
            if (null == category)
                return;
            categoryRepository.Add(category);
        }

        public void Update(Category category)
        {
            if (null == category)
                return;
            categoryRepository.Update(category);
        }

        public Category Get(int id)
        {
            return categoryRepository.Get(id);
        }

        public void Delete(int id)
        {
            categoryRepository.Delete(id);
        }

        public IEnumerable<Category> Fetch()
        {
            return categoryRepository.Fetch();
        }

    }
}

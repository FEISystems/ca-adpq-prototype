using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using ca_service.Interfaces;
using ca_service.Services;
using ca_service.Entities;
using Microsoft.Extensions.Configuration;
using Swashbuckle.AspNetCore.Swagger;
using ca_service.Repositories;

namespace ca_proto
{
    public class Startup
    {
        public static void Main(string[] args)
        {
            var host = new WebHostBuilder()
                .UseKestrel()
                .UseContentRoot(Directory.GetCurrentDirectory())
                .UseIISIntegration()
                .UseStartup<Startup>()
                .Build();

            host.Run();
        }

        public IConfigurationRoot Configuration { get; }

        public Startup(IHostingEnvironment env)
        {
            var builder = new ConfigurationBuilder()
                .SetBasePath(env.ContentRootPath)
                .AddJsonFile("appSettings.json");

            Configuration = builder.Build();

        }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            // Add framework services.
            services.AddMvc();
            services.AddTransient<IUserService, UserService>();
            services.AddTransient<IUserRepository, UserRepository>();
            services.AddTransient<IInventoryService, InventoryService>();
            services.AddTransient<IImageService, ImageService>();
            services.AddTransient<ICategoryService, CategoryService>();
            services.AddTransient<IContractService, ContractService>();
            services.AddTransient<IContractorService, ContractorService>();
            services.AddTransient<IInventoryRepository, InventoryRepository>();
            services.AddTransient<IImageRepository, ImageRepository>();
            services.AddTransient<ICategoryRepository, CategoryRepository>();
            services.AddTransient<IContractRepository, ContractRepository>();
            services.AddTransient<IContractorRepository, ContractorRepository>();
            services.AddTransient<IShoppingCartRepository, ShoppingCartRepository>();
            services.AddTransient<IShoppingCartItemRepository, ShoppingCartItemRepository>();
            services.AddTransient<IShoppingCartService, ShoppingCartService>();
            services.AddSingleton<IConfiguration>(Configuration);
            services.AddMemoryCache();
            // Register the Swagger generator, defining one or more Swagger documents
            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new Info { Title = "Ca Proto", Version = "v1" });
            });

            services.AddMvc()
               .AddJsonOptions(options =>
               {
                   options.SerializerSettings.ContractResolver = new Newtonsoft.Json.Serialization.DefaultContractResolver();
               });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env, ILoggerFactory loggerFactory)
        {
            loggerFactory.AddConsole();

            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseBrowserLink();
            }

            app.UseDefaultFiles();
            app.UseStaticFiles();
            app.UseMvcWithDefaultRoute();
            // Enable middleware to serve generated Swagger as a JSON endpoint.
            app.UseSwagger();

            // Enable middleware to serve swagger-ui (HTML, JS, CSS etc.), specifying the Swagger JSON endpoint.
            app.UseSwaggerUi(c =>
            {
                c.SwaggerEndpoint("/swagger/v1/swagger.json", "Ca Proto");
            });
        }
    }
}

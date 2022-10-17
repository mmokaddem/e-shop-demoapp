using e_shop.Data.SeedDtos;
using e_shop.Entities;
using e_shop.Entities.OrderAggregate;
using System.Text.Json;

namespace e_shop.Data
{
  public class StoreContextSeed
  {
    public static async Task SeedAsync(StoreContext context, ILoggerFactory loggerFactory)
    {
      try
      {
        if (!context.DeliveryMethods.Any())
        {
          var dmData = File.ReadAllText("./Data/SeedData/delivery.json");

          var methods = JsonSerializer.Deserialize<List<DeliveryMethod>>(dmData);

          if (methods != null)
          {
            foreach (var item in methods)
            {
              context.DeliveryMethods.Add(item);
            }

            await context.SaveChangesAsync();
          }
        }


        if (!context.ProductBrands.Any())
        {
          var brandsData = File.ReadAllText("./Data/SeedData/brands.json");

          var brands = JsonSerializer.Deserialize<List<ProductBrand>>(brandsData);

          if (brands != null)
          {
            foreach (var item in brands)
            {
              context.ProductBrands.Add(item);
            }

            await context.SaveChangesAsync();
          }
        }

        if (!context.ProductCategories.Any())
        {
          var categoriesData = File.ReadAllText("./Data/SeedData/categories.json");

          var categories = JsonSerializer.Deserialize<List<ProductCategory>>(categoriesData);

          if (categories != null)
          {
            foreach (var item in categories)
            {
              context.ProductCategories.Add(item);
            }

            await context.SaveChangesAsync();
          }
        }

        if (!context.Products.Any())
        {
          await seedLaptops(context);
          await seedTablets(context);
        }
      }
      catch (Exception ex)
      {
        var logger = loggerFactory.CreateLogger<StoreContextSeed>();
        logger.LogError(ex.Message);
      }
    }

    private static async Task seedTablets(StoreContext context)
    {
      var tabletsData = File.ReadAllText("./Data/SeedData/tablets.json");
      var tablets = JsonSerializer.Deserialize<List<Tablet>>(tabletsData);

      if (tablets != null)
      {
        foreach (var item in tablets)
        {
          var productCategory = context.ProductCategories.FirstOrDefault(x => x.Id == 2);
          var productBrand = context.ProductBrands.FirstOrDefault(b => b.Name == item.Brand);

          var product = new Product
          {
            ProductCategory = productCategory,
            ProductBrand = productBrand,
            Name = item.ModelName,
            Description = $"{item.ModelName}, {item.ScreenSize}\", {item.RAM}",
            Price = item.Price,
            PictureUrl = getProductPictureFromDirectory("tablets", item.Brand, item.ModelName),
          };

          context.Products.Add(product);
        }

        await context.SaveChangesAsync();
      }
    }

    private static async Task seedLaptops(StoreContext context)
    {
      var laptopsData = File.ReadAllText("./Data/SeedData/laptops.json");
      var laptops = JsonSerializer.Deserialize<List<Laptop>>(laptopsData);

      if (laptops != null)
      {
        foreach (var item in laptops)
        {
          var productCategory = context.ProductCategories.FirstOrDefault(x => x.Id == 1);
          var productBrand = context.ProductBrands.FirstOrDefault(b => b.Name == item.Brand);

          var product = new Product
          {
            ProductCategory = productCategory,
            ProductBrand = productBrand,
            Name = item.ModelName,
            Description = $"{item.ModelName}, {item.LaptopCategory}, {item.ScreenSize}\", {item.CPU}, {item.RAM}, {item.GPU}, {item.Storage}",
            Price = item.Price,
            PictureUrl = getProductPictureFromDirectory("laptops", item.Brand, item.ModelName),
          };

          context.Products.Add(product);
        }

        await context.SaveChangesAsync();
      }
    }

    private static string getProductPictureFromDirectory(string product,
      string brand, string modelName)
    {
      string path = $"Content/images/products/{product}/{brand}/{modelName}";
      string[] fileNames = Directory.GetFiles(path).Select(f => Path.GetFileName(f)).ToArray();
      string[] pictureUrls =
        fileNames.Select(name => $"images/products/{product}/{brand}/{modelName}/{name}").ToArray();

      return pictureUrls.FirstOrDefault();
    }
  }
}

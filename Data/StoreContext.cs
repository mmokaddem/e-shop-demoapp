using e_shop.Entities;
using e_shop.Entities.Identity;
using e_shop.Entities.OrderAggregate;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using System.Reflection;

namespace e_shop.Data
{
  public class StoreContext : IdentityDbContext<AppUser>
  {
    public StoreContext(DbContextOptions options) : base(options)
    {

    }

    public DbSet<Product> Products { get; set; }
    public DbSet<ProductCategory> ProductCategories { get; set; }
    public DbSet<ProductBrand> ProductBrands { get; set; }
    public DbSet<CustomerBasket> CustomerBaskets { get; set; }
    public DbSet<Order> Orders { get; set; }
    public DbSet<OrderItem> OrderItems { get; set; }
    public DbSet<DeliveryMethod> DeliveryMethods { get; set; }


    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
      base.OnModelCreating(modelBuilder);
      modelBuilder.ApplyConfigurationsFromAssembly(Assembly.GetExecutingAssembly());

      if (Database.ProviderName == "Microsoft.EntityFrameworkCore.Sqlite")
      {
        foreach (var entityType in modelBuilder.Model.GetEntityTypes())
        {
          var properties = entityType.ClrType.GetProperties().Where(p => p.PropertyType
          == typeof(decimal));

          var dateTimeProperties = entityType.ClrType.GetProperties().Where(p => p.PropertyType
          == typeof(DateTimeOffset));

          foreach (var property in properties)
          {
            modelBuilder.Entity(entityType.Name).Property(property.Name)
                .HasConversion<double>();
          }

          foreach (var property in dateTimeProperties)
          {
            modelBuilder.Entity(entityType.Name).Property(property.Name)
                .HasConversion(new DateTimeOffsetToBinaryConverter());
          }
        }
      }

      modelBuilder
     .Entity<CustomerBasket>().HasMany(x => x.Items).WithOne().OnDelete(DeleteBehavior.Cascade);


    }
  }
}

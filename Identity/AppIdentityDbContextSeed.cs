using e_shop.Entities.Identity;
using Microsoft.AspNetCore.Identity;

namespace e_shop.Identity
{
  public class AppIdentityDbContextSeed
  {
    public static async Task SeedUsersAsync(UserManager<AppUser> userManager)
    {
      if (!userManager.Users.Any())
      {
        var user = new AppUser
        {
          FirstName = "Bob",
          LastName = "Bobbity",
          Email = "bob@test.com",
          UserName = "bob@test.com",
          Address = new Address
          {
            FirstName = "Bob",
            LastName = "Bobbity",
            Street = "10",
            City = "New York",
            State = "NY",
            ZipCode = "90210",
          }
        };

        await userManager.CreateAsync(user, "Pa$$w0rd");
      }
    }
  }
}

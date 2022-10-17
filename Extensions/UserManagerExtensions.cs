using e_shop.Entities.Identity;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

namespace e_shop.Extensions
{
  public static class UserManagerExtensions
  {
    public static async Task<AppUser> FindUserByClaimsPrincipleWithAddressAsync(this UserManager<AppUser> input,
      ClaimsPrincipal user)
    {
      var email = user.FindFirstValue(ClaimTypes.Email);

      return await input.Users.Include(x => x.Address).SingleOrDefaultAsync(x => x.Email == email);
    }

    public static async Task<AppUser> FindUserByClaimsPrinciple(this UserManager<AppUser> input,
      ClaimsPrincipal user)
    {
      var email = user.FindFirstValue(ClaimTypes.Email);

      return await input.Users.SingleOrDefaultAsync(x => x.Email == email);
    }
  }
}

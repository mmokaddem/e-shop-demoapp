using e_shop.Data;
using e_shop.Entities.Identity;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;
using System.Text;

namespace e_shop.Extensions
{
  public static class IdentityServiceExtensions
  {
    public static IServiceCollection AddIdentityServices(this IServiceCollection services, IConfiguration config)
    {
      var builder = services.AddIdentityCore<AppUser>();

      builder = new IdentityBuilder(builder.UserType, builder.Services);
      builder.AddEntityFrameworkStores<StoreContext>();
      builder.AddSignInManager<SignInManager<AppUser>>();

      builder.Services.Configure<IdentityOptions>(options =>
      {
        options.Password.RequireDigit = false;
        options.Password.RequireLowercase = false;
        options.Password.RequireNonAlphanumeric = false;
        options.Password.RequireUppercase = false;
        options.Password.RequiredLength = 6;
      });

      services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
        .AddJwtBearer(options =>
        {
          options.TokenValidationParameters = new TokenValidationParameters
          {
            ValidateIssuerSigningKey = true,
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(config["Token:Key"])),
            ValidIssuer = config["Token:Issuer"],
            ValidateIssuer = true,
            ValidateAudience = false,
          };
        });

      return services;
    }
  }
}

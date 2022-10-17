using e_shop.Data.Infrastructure.Data;
using e_shop.Data.Interfaces;
using e_shop.Errors;
using e_shop.Helpers;
using e_shop.Repositories;
using e_shop.Repositories.Interfaces;
using e_shop.Services;
using e_shop.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace e_shop.Extensions
{
  public static class ApplicationServicesExtensions
  {
    public static IServiceCollection AddApplicationServices(this IServiceCollection services)
    {
      services.AddSingleton<IResponseCacheService, ResponseCacheService>();
      services.AddScoped<ITokenService, TokenService>();
      services.AddScoped<IOrderService, OrderService>();
      services.AddScoped<IPaymentService, PaymentService>();
      services.AddScoped<IUnitOfWork, UnitOfWork>();
      services.AddScoped(typeof(IGenericRepository<>), (typeof(GenericRepository<>)));
      services.AddScoped<IBasketRepository, BasketRepository>();
      services.AddAutoMapper(typeof(MappingProfiles));
      services.Configure<ApiBehaviorOptions>(options =>
      {
        options.InvalidModelStateResponseFactory = actionContext =>
        {
          var errors = actionContext.ModelState
                .Where(e => e.Value.Errors.Count() > 0)
                .SelectMany(x => x.Value.Errors)
                .Select(x => x.ErrorMessage)
                .ToArray();

          var errorResponse = new ApiValidationErrorResponse
          {
            Errors = errors
          };

          return new BadRequestObjectResult(errorResponse);
        };
      });

      return services;
    }
  }
}

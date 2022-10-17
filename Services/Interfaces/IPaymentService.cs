using e_shop.Entities;
using e_shop.Entities.OrderAggregate;

namespace e_shop.Services.Interfaces
{
  public interface IPaymentService
  {
    Task<CustomerBasket> CreateOrUpdatePaymentIntent(string basketId);
    Task<Order> UpdateOrderPaymentSucceeded(string paymentIntentId);
    Task<Order> UpdateOrderPaymentFailed(string paymentIntentId);
  }
}

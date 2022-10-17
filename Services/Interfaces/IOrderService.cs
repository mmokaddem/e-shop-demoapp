using e_shop.Entities.OrderAggregate;

namespace e_shop.Services.Interfaces
{
  public interface IOrderService
  {
    Task<Order> CreateOrderAsync(string buyerEmail, int deliveryMethod, string basketId, Address shippingAddress);
    Task<IReadOnlyList<Order>> GetOrdersForUserAsync(string buyerEmail);
    Task<Order> GetOrderByIdAsync(int id, string buyerEmail);
    Task<IReadOnlyList<DeliveryMethod>> GetDeliveryMethodsAsync();
  }
}

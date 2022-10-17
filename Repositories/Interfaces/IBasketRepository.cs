using e_shop.Entities;

namespace e_shop.Repositories.Interfaces
{
  public interface IBasketRepository
  {
    Task<CustomerBasket> GetBasketAsync(string basketId);
    Task<CustomerBasket> UpdateBasketAsync(CustomerBasket basket);
    Task<bool> DeleteBasketAsync(string basketId);
  }
}

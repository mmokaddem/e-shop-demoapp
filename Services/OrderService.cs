using e_shop.Data.Interfaces;
using e_shop.Entities;
using e_shop.Entities.OrderAggregate;
using e_shop.Repositories.Interfaces;
using e_shop.Services.Interfaces;
using e_shop.Specifications;

namespace e_shop.Services
{
  public class OrderService : IOrderService
  {
    private readonly IBasketRepository _basketRepo;
    private readonly IUnitOfWork _unitOfWork;
    private readonly IPaymentService _paymentService;
    private readonly IGenericRepository<Product> _productRepo;

    public OrderService(IBasketRepository basketRepo, IUnitOfWork unitOfWork, IPaymentService paymentService,
      IGenericRepository<Product> productRepo)
    {
      _basketRepo = basketRepo;
      _unitOfWork = unitOfWork;
      _paymentService = paymentService;
      _productRepo = productRepo;
    }

    public async Task<Order> CreateOrderAsync(string buyerEmail, int deliveryMethodId, string basketId, Address shippingAddress)
    {
      // get basket from the repo
      var basket = await _basketRepo.GetBasketAsync(basketId);

      // get items from the product repo
      var items = new List<OrderItem>();
      foreach (var item in basket.Items)
      {
        var productSpec = new ProductsWithCategorysAndBrandsSpecification(item.Id);
        var productItem = await _productRepo.GetEntityWithSpec(productSpec);
        var itemOrdered = new ProductItemOrdered(productItem.Id, productItem.Name, productItem.PictureUrl);
        var orderItem = new OrderItem(itemOrdered, productItem.Price, item.Quantity);
        items.Add(orderItem);
      }

      // get delivery method from repo
      var deliveryMethod = await _unitOfWork.Repository<DeliveryMethod>().GetByIdAync(deliveryMethodId);

      // cehck to see if order exists
      var spec = new OrderByPaymentIntentIdSpecification(basket.PaymentIntentId);
      var existingOrder = await _unitOfWork.Repository<Order>().GetEntityWithSpec(spec);

      if (existingOrder != null)
      {
        _unitOfWork.Repository<Order>().Delete(existingOrder);
        await _paymentService.CreateOrUpdatePaymentIntent(basket.PaymentIntentId);
      }

      // calc subtotal
      var subtotal = items.Sum(item => item.Price * item.Quantity);

      // create order
      var order = new Order(items, buyerEmail, shippingAddress, deliveryMethod, subtotal, basket.PaymentIntentId);
      _unitOfWork.Repository<Order>().Add(order);

      // save to db
      var result = await _unitOfWork.Complete();

      if (result <= 0) return null;

      // return order
      return order;
    }

    public async Task<IReadOnlyList<DeliveryMethod>> GetDeliveryMethodsAsync()
    {
      return await _unitOfWork.Repository<DeliveryMethod>().ListAllAsyn();
    }

    public async Task<Order> GetOrderByIdAsync(int id, string buyerEmail)
    {
      var spec = new OrdersWithItemsAndOrderingSpecification(id, buyerEmail);

      return await _unitOfWork.Repository<Order>().GetEntityWithSpec(spec);
    }

    public async Task<IReadOnlyList<Order>> GetOrdersForUserAsync(string buyerEmail)
    {
      var spec = new OrdersWithItemsAndOrderingSpecification(buyerEmail);

      return await _unitOfWork.Repository<Order>().ListAsync(spec);
    }
  }
}

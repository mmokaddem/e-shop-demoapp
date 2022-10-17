using e_shop.Entities.OrderAggregate;

namespace e_shop.Specifications
{
  public class OrderByPaymentIntentIdSpecification : BaseSpecification<Order>
  {
    public OrderByPaymentIntentIdSpecification(string paymentIntentId)
      : base(o => o.PaymentIntentId == paymentIntentId)
    {

    }
  }
}

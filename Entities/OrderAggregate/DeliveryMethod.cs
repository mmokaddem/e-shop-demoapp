using Microsoft.EntityFrameworkCore.Metadata.Internal;
using System.ComponentModel.DataAnnotations.Schema;

namespace e_shop.Entities.OrderAggregate
{
  public class DeliveryMethod : BaseEntity
  {
    public string ShortName { get; set; }
    public string DeliveryTime { get; set; }
    public string Description { get; set; }
    [Column(TypeName = "decimal(18,2)")]
    public decimal Price { get; set; }
  }
}

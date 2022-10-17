using System.ComponentModel.DataAnnotations;

namespace e_shop.Entities
{
  public class ProductBrand : BaseEntity
  {
    [Required]
    public string Name { get; set; }
  }
}
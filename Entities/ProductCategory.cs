using System.ComponentModel.DataAnnotations;

namespace e_shop.Entities
{
  public class ProductCategory : BaseEntity
  {
    [Required]
    public string Name { get; set; }
    public string Icon { get; set; }
  }
}
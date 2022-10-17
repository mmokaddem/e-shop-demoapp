using Microsoft.EntityFrameworkCore.Metadata.Internal;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace e_shop.Entities
{
  public class Product : BaseEntity
  {
    [Required]
    [MaxLength(100)]
    public string Name { get; set; }
    [Required]
    [MaxLength(255)]
    public string Description { get; set; }
    [Column(TypeName = "decimal(18,2)")]
    public decimal Price { get; set; }
    [Required]
    public string PictureUrl { get; set; }
    public ProductCategory ProductCategory { get; set; }
    public ProductBrand ProductBrand { get; set; }
  }
}

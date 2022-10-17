using e_shop.Entities;

namespace e_shop.Specifications
{
  public class ProductWithFiltersForCountSpecification : BaseSpecification<Product>
  {
    public ProductWithFiltersForCountSpecification(ProductSpecParams productParams)
        : base(x =>
            (
              string.IsNullOrEmpty(productParams.BrandIds)
              ||
              productParams.BrandIds.Split(", ", StringSplitOptions.None).Contains(x.ProductBrand.Id.ToString())
            )
            &&
            (!productParams.CategoryId.HasValue || x.ProductCategory.Id == productParams.CategoryId)
        )
    {

    }
  }
}

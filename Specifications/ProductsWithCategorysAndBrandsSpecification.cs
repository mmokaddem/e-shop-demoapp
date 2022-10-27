using e_shop.Entities;

namespace e_shop.Specifications
{
  public class ProductsWithCategorysAndBrandsSpecification : BaseSpecification<Product>
  {
    public ProductsWithCategorysAndBrandsSpecification(ProductSpecParams productParams)
        : base(x =>
            (
              string.IsNullOrEmpty(productParams.Search) ||
              x.Name.ToLower().Contains(productParams.Search)
            )
            &&
            (
              string.IsNullOrEmpty(productParams.BrandIds)
              ||
              productParams.BrandIds.Split(", ", StringSplitOptions.None).Contains(x.ProductBrand.Id.ToString())
            )
            &&
            (!productParams.CategoryId.HasValue || x.ProductCategory.Id == productParams.CategoryId)
            && (productParams.MinPrice == null || x.Price >= productParams.MinPrice)
            && (productParams.MaxPrice == null || x.Price <= productParams.MaxPrice)

        )
    {
      AddInclude(x => x.ProductCategory);
      AddInclude(x => x.ProductBrand);
      AddOrderBy(x => x.Name);
      ApplyPaging(productParams.PageSize * (productParams.PageIndex - 1), productParams.PageSize);

      if (!string.IsNullOrEmpty(productParams.Sort))
      {
        switch (productParams.Sort)
        {
          case "priceAsc":
            AddOrderBy(p => p.Price);
            break;
          case "priceDesc":
            AddOrderByDescending(p => p.Price);
            break;
          default:
            AddOrderBy(p => p.Name);
            break;
        }
      }
    }

    public ProductsWithCategorysAndBrandsSpecification(int id)
        : base(x => x.Id == id)
    {
      AddInclude(x => x.ProductCategory);
      AddInclude(x => x.ProductBrand);
    }
  }
}

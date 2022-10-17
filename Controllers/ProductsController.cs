using AutoMapper;
using e_shop.Dtos;
using e_shop.Entities;
using e_shop.Errors;
using e_shop.Helpers;
using e_shop.Repositories.Interfaces;
using e_shop.Specifications;
using Microsoft.AspNetCore.Mvc;

namespace e_shop.Controllers
{
  public class ProductsController : BaseApiController
  {
    private readonly IGenericRepository<Product> _productRepo;
    private readonly IGenericRepository<ProductCategory> _productCategoryRepo;
    private readonly IGenericRepository<ProductBrand> _productBrandRepo;
    private readonly IMapper _mapper;

    public ProductsController(IGenericRepository<Product> productRepo, IGenericRepository<ProductCategory> productCategoryRepo,
      IGenericRepository<ProductBrand> productBrandRepo, IMapper mapper)
    {
      _productRepo = productRepo;
      _productCategoryRepo = productCategoryRepo;
      _productBrandRepo = productBrandRepo;
      _mapper = mapper;
    }

#if !DEBUG
    [Cached(600)]
#endif
    [HttpGet]
    public async Task<ActionResult<Pagination<ProductToReturnDto>>> GetProducts(
      [FromQuery] ProductSpecParams productParams)
    {
      var spec = new ProductsWithCategorysAndBrandsSpecification(productParams);

      var countSpec = new ProductWithFiltersForCountSpecification(productParams);

      var totalItems = await _productRepo.CountAsync(countSpec);

      var products = await _productRepo.ListAsync(spec);

      var data = _mapper.Map<IReadOnlyList<Product>, IReadOnlyList<ProductToReturnDto>>(products);

      return Ok(new Pagination<ProductToReturnDto>(productParams.PageIndex, productParams.PageSize, totalItems,
        data));
    }

#if !DEBUG
    [Cached(600)]
#endif
    [HttpGet("{id}")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(ApiResponse), StatusCodes.Status404NotFound)]
    public async Task<ActionResult<ProductToReturnDto>> GetProduct(int id)
    {

      var spec = new ProductsWithCategorysAndBrandsSpecification(id);

      var product = await _productRepo.GetEntityWithSpec(spec);

      if (product == null) return NotFound(new ApiResponse(404));

      return Ok(_mapper.Map<Product, ProductToReturnDto>(product));
    }

#if !DEBUG
    [Cached(600)]
#endif
    [HttpGet("categories")]
    public async Task<ActionResult<List<ProductCategory>>> GetProductCategories()
    {
      var categories = await _productCategoryRepo.ListAllAsyn();

      if (categories == null) return NoContent();

      return Ok(categories);
    }

#if !DEBUG
    [Cached(600)]
#endif
    [HttpGet("brands")]
    public async Task<ActionResult<List<ProductBrand>>> GetProductBrands()
    {
      var brands = await _productBrandRepo.ListAllAsyn();

      if (brands == null) return NoContent();

      return Ok(brands);
    }
  }
}

﻿namespace e_shop.Specifications
{
  public class ProductSpecParams
  {
    private const int MaxPageSize = 50;

    public int PageIndex { get; set; } = 1;

    private int _pageSize = 20;
    public int PageSize
    {
      get => _pageSize;
      set => _pageSize = (value > MaxPageSize) ? MaxPageSize : value;
    }

    public string BrandIds { get; set; }
    public int? CategoryId { get; set; }
    public string Sort { get; set; }
    private string _search;
    public string Search
    {
      get => _search;
      set => _search = value?.ToLower();
    }

    public int? MinPrice { get; set; }
    public int? MaxPrice { get; set; }
  }
}

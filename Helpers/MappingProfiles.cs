using AutoMapper;
using e_shop.Dtos;
using e_shop.Entities;
using e_shop.Entities.OrderAggregate;

namespace e_shop.Helpers
{
  public class MappingProfiles : Profile
  {
    public MappingProfiles()
    {
      CreateMap<Product, ProductToReturnDto>()
        .ForMember(d => d.Brand, o =>
            o.MapFrom(s => s.ProductBrand == null ? "-/-" : s.ProductBrand.Name))
        .ForMember(d => d.Category, o =>
            o.MapFrom(s => s.ProductCategory == null ? "-/-" : s.ProductCategory.Name))
        .ForMember(s => s.PictureUrl, o => o.MapFrom<ProductUrlResolver>());

      CreateMap<Entities.Identity.Address, AddressDto>().ReverseMap();
      CreateMap<CustomerBasketDto, CustomerBasket>();
      CreateMap<BasketItemDto, BasketItem>();
      CreateMap<AddressDto, Address>();
      CreateMap<Order, OrderToReturnDto>()
        .ForMember(d => d.DeliveryMethod, o => o.MapFrom(s => s.DeliveryMethod.ShortName))
        .ForMember(d => d.ShippingPrice, o => o.MapFrom(s => s.DeliveryMethod.Price));
      CreateMap<OrderItem, OrderItemDto>()
        .ForMember(d => d.ProductId, o => o.MapFrom(s => s.ItemOrdered.ProductItemId))
        .ForMember(d => d.ProductName, o => o.MapFrom(s => s.ItemOrdered.ProductName))
      .ForMember(d => d.PictureUrl, o => o.MapFrom<OrderItemUrlResolver>());
    }
  }
}
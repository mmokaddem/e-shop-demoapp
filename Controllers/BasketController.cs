using AutoMapper;
using e_shop.Data.Interfaces;
using e_shop.Dtos;
using e_shop.Entities;
using e_shop.Repositories.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace e_shop.Controllers
{
  public class BasketController : BaseApiController
  {
    private readonly IBasketRepository _basketRepository;
    private readonly IMapper _mapper;
    private readonly IUnitOfWork _unitOfWork;

    public BasketController(IBasketRepository basketRepository, IMapper mapper, IUnitOfWork unitOfWork)
    {
      _basketRepository = basketRepository;
      _mapper = mapper;
      _unitOfWork = unitOfWork;
    }

    [HttpGet]
    public async Task<ActionResult<CustomerBasket>> GetBasketById(string id)
    {
      var basket = await _basketRepository.GetBasketAsync(id);

      return Ok(basket ?? new CustomerBasket(id));
    }

    [HttpPost]
    public async Task<ActionResult<CustomerBasket>> UpdateBasket(CustomerBasketDto basket)
    {
      var customerBasket = _mapper.Map<CustomerBasketDto, CustomerBasket>(basket);

      var updatedBasket = await _basketRepository.UpdateBasketAsync(customerBasket);

      return Ok(updatedBasket);
    }

    [HttpDelete]
    public async Task DeleteBasketAsync(string id)
    {
      await _basketRepository.DeleteBasketAsync(id);
    }
  }
}

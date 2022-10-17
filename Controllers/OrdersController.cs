﻿using AutoMapper;
using e_shop.Dtos;
using e_shop.Entities.OrderAggregate;
using e_shop.Errors;
using e_shop.Extensions;
using e_shop.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace e_shop.Controllers
{
  [Authorize]
  public class OrdersController : BaseApiController
  {
    private readonly IOrderService _orderService;
    private readonly IMapper _mapper;

    public OrdersController(IOrderService orderService, IMapper mapper)
    {
      _orderService = orderService;
      _mapper = mapper;
    }

    [HttpPost]
    public async Task<ActionResult<Order>> CreateOrder(OrderDto orderDto)
    {
      var email = HttpContext.User.RetrieveEmailFromPrincipal();

      var address = _mapper.Map<AddressDto, Address>(orderDto.ShipToAddress);

      var order = await _orderService.CreateOrderAsync(email, orderDto.DeliveryMethodId, orderDto.BasketId,
        address);

      if (order == null) return BadRequest(new ApiResponse(400, "Problem by creating the order"));

      return Ok(order);
    }

    [HttpGet]
    public async Task<ActionResult<IReadOnlyList<OrderToReturnDto>>> GetOrdersForUser()
    {
      var email = User.RetrieveEmailFromPrincipal();

      var orders = await _orderService.GetOrdersForUserAsync(email);

      return Ok(_mapper.Map<IReadOnlyList<Order>, IReadOnlyList<OrderToReturnDto>>(orders));
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<OrderToReturnDto>> GetOrderByIdForUser(int id)
    {
      var email = User.RetrieveEmailFromPrincipal();

      var order = await _orderService.GetOrderByIdAsync(id, email);

      if (order == null) return NotFound(new ApiResponse(404));

      return _mapper.Map<Order, OrderToReturnDto>(order);
    }

    [HttpGet("deliveryMethods")]
    public async Task<ActionResult<IReadOnlyList<DeliveryMethod>>> GetDeliveryMethods()
    {
      return Ok(await _orderService.GetDeliveryMethodsAsync());
    }
  }
}

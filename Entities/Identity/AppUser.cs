﻿using Microsoft.AspNetCore.Identity;

namespace e_shop.Entities.Identity
{
  public class AppUser : IdentityUser
  {
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public Address Address { get; set; }
  }
}

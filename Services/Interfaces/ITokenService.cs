using e_shop.Entities.Identity;

namespace e_shop.Services.Interfaces
{
  public interface ITokenService
  {
    string CreateToken(AppUser user);
  }
}

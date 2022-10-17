using Microsoft.AspNetCore.Mvc;

namespace e_shop.Controllers
{
  public class FallbackController : Controller
  {
    public IActionResult Index()
    {
      return PhysicalFile(Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "index.html"), "text/HTML");
    }
  }
}

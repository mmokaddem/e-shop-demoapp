using e_shop.Errors;
using Microsoft.AspNetCore.Mvc;

namespace e_shop.Controllers
{
  [Route("errors/{code}")]
  [ApiExplorerSettings(IgnoreApi = true)]
  public class ErrorController : BaseApiController
  {
    public IActionResult Error(int code)
    {
      return new ObjectResult(new ApiResponse(code));
    }
  }
}

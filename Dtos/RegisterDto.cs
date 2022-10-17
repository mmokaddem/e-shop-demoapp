using System.ComponentModel.DataAnnotations;

namespace e_shop.Dtos
{
  public class RegisterDto
  {
    [Required]
    [Display(Name = "Firstname")]
    public string FirstName { get; set; }
    [Required]
    [Display(Name = "Lastname")]
    public string LastName { get; set; }
    [Required]
    public string Email { get; set; }
    [Required]
    [MinLength(6, ErrorMessage = "Password must have at least 6 characters")]
    public string Password { get; set; }
  }
}

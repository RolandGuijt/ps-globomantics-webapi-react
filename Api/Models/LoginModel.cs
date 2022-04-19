namespace ConfArch.Web.Models
{
    public class LoginModel
    {
        public string Username { get; set; } = string.Empty;
        public string Password { get; set; } = String.Empty;
        public bool RememberLogin { get; set; }
    }
}

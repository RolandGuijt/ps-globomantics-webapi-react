using WebApplication17.Dtos;

namespace ConfArch.Data.Repositories
{
    public interface IUserRepository
    {
        UserEntity? GetByUsernameAndPassword(string username, string password);
    }
    public class UserRepository : IUserRepository
    {
        private List<UserEntity> users = new()
        {
            new UserEntity(3522, "roland", "K7gNU3sdo+OL0wNhqoVWhr3g6s1xYv72ol/pe/Unols=", "blue", "Admin")
        };

        public UserEntity? GetByUsernameAndPassword(string username, string password)
        {
            var user = users.SingleOrDefault(u => u.Name == username && u.Password == password.Sha256());
            return user;
        }
    }
}

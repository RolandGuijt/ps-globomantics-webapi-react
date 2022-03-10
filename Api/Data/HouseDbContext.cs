using Microsoft.EntityFrameworkCore;

public class HouseDbContext: DbContext
{
    public DbSet<HouseEntity> Houses => Set<HouseEntity>();

        protected override void OnConfiguring(DbContextOptionsBuilder options)
        {
            var folder = Environment.SpecialFolder.LocalApplicationData;
            var path = Environment.GetFolderPath(folder);
            options.UseSqlite($"Data Source={Path.Join(path, "houses.db")}");
        }
}
public interface IHouseRepository
{
    Task<List<HouseDto>> GetAll();
    Task<HouseDto> Add(HouseDto house);
    Task<HouseDto> Update(HouseDto house);
    void Delete(HouseDto house);
}

public class HouseRepository : IHouseRepository
{
    private readonly HouseDbContext context;

    public HouseRepository(HouseDbContext context)
    {
        this.context = context;
    }

    public async Task<List<HouseDto>> GetAll()
    {
        return await context.Houses.Select(e => e.ToDto()).ToListAsync();
    }

    public async Task<HouseDto> Add(HouseDto house)
    {
        var newHouse = new HouseEntity();
        newHouse.FromDto(house);
        context.Houses.Add(newHouse);
        await context.SaveChangesAsync();
        return newHouse.ToDto();
    }

    public async Task<HouseDto> Update(HouseDto house)
    {
        var entity = await context.Houses.FindAsync(house.Id);
        if (entity == null)
            throw new ArgumentException($"Trying to update house: entity with ID {house.Id} not found.");
        entity.FromDto(house);
        await context.SaveChangesAsync();
        return entity.ToDto();
    }

    public async void Delete(HouseDto house)
    {
        var entity = await context.Houses.FindAsync(house.Id);
        if (entity == null)
            throw new ArgumentException($"Trying to delete house: entity with ID {house.Id} not found.");
        context.Houses.Remove(entity);
        await context.SaveChangesAsync();
    }
}
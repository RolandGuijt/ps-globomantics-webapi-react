public interface IHouseRepository
{
    Task<List<HouseDto>> GetAll();
    Task<HouseDetailDto> Get(int id);
    Task<HouseDto> Add(HouseDetailDto house);
    Task<HouseDto> Update(HouseDetailDto house);
    void Delete(int id);
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

    public async Task<HouseDetailDto> Get(int id)
    {
        var entity = await context.Houses.Include(h => h.Bids).SingleAsync(h => h.Id == id);
        return entity.ToDetailDto();
    }

    public async Task<HouseDto> Add(HouseDetailDto house)
    {
        var newHouse = new HouseEntity();
        newHouse.FromDto(house);
        context.Houses.Add(newHouse);
        await context.SaveChangesAsync();
        return newHouse.ToDto();
    }

    public async Task<HouseDto> Update(HouseDetailDto house)
    {
        var entity = await context.Houses.FindAsync(house.Id);
        if (entity == null)
            throw new ArgumentException($"Trying to update house: entity with ID {house.Id} not found.");
        entity.FromDto(house);
        await context.SaveChangesAsync();
        return entity.ToDto();
    }

    public async void Delete(int id)
    {
        var entity = await context.Houses.FindAsync(id);
        if (entity == null)
            throw new ArgumentException($"Trying to delete house: entity with ID {id} not found.");
        context.Houses.Remove(entity);
        await context.SaveChangesAsync();
    }
}
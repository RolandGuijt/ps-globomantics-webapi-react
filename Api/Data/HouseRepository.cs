public class HouseRepository
{
    private readonly HouseDbContext context;

    public HouseRepository(HouseDbContext context)
    {
        this.context = context;
    }

    public List<HouseDto> GetAll() {
        return context.Houses.Select(e => new HouseDto()).ToList();
    }
}
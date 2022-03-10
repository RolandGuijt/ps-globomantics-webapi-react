public interface IBidRepository
{
    Task<List<BidDto>> GetAll();
    Task<BidDto> Add(BidDto bid);
}

public class BidRepository : IBidRepository
{
    private readonly HouseDbContext context;

    public BidRepository(HouseDbContext context)
    {
        this.context = context;
    }

    public async Task<List<BidDto>> GetAll()
    {
        return await context.Bids.Select(e => e.ToDto()).ToListAsync();
    }

    public async Task<BidDto> Add(BidDto bid)
    {
        var newBid = new BidEntity();
        newBid.FromDto(bid);
        context.Bids.Add(newBid);
        await context.SaveChangesAsync();
        return newBid.ToDto();
    }
}
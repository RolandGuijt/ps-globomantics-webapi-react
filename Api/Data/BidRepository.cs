public interface IBidRepository
{
    Task<BidDto> Add(BidDto bid);
}

public class BidRepository : IBidRepository
{
    private readonly HouseDbContext context;

    public BidRepository(HouseDbContext context)
    {
        this.context = context;
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
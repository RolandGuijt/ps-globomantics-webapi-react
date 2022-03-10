public class BidEntity
{
    public int Id { get; set; }
    public int HouseId { get; set; }
    public string Bidder { get; set; } = string.Empty;
    public int Amount { get; set; }

    public BidDto ToDto()
    {
        return new BidDto(Id, HouseId, Bidder, Amount);
    }

    public void FromDto(BidDto dto)
    {
        HouseId = dto.HouseId;
        Bidder = dto.Bidder;
        Amount = dto.Amount;
    }
}
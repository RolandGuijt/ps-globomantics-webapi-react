public class HouseEntity
{
    public int Id { get; set; }
    public string? Address { get; set; }
    public string? Country { get; set; }
    public string? Description { get; set; }
    public int Price { get; set; }
    public string? Photo { get; set; }
    public List<BidEntity> Bids { get; set; } = new List<BidEntity>();

    public HouseDto ToDto()
    {
        return new HouseDto(Id, Address, Country, Price);
    }

    public HouseDetailDto ToDetailDto()
    {
        return new HouseDetailDto(Id, Address, Country, Description, Price, Photo,
            Bids.Select(b => new BidDto(b.Id, b.HouseId, b.Bidder, b.Amount)));
    }

    public void FromDto(HouseDetailDto dto)
    {
        Address = dto.Address;
        Country = dto.Country;
        Description = dto.Description;
        Price = dto.Price;
        Photo = dto.Photo;
    }
}
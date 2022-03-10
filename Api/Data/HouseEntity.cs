public class HouseEntity
{
    public int Id { get; set; }
    public string? Address { get; set; }
    public string? Country { get; set; }
    public string? Description { get; set; }
    public int Price { get; set; }

    public HouseDto ToDto()
    {
        return new HouseDto(Id, Address, Country, Description, Price);
    }

    public void FromDto(HouseDto dto)
    {
        Address = dto.Address;
        Country = dto.Country;
        Description = dto.Description;
        Price = dto.Price;
    }
}
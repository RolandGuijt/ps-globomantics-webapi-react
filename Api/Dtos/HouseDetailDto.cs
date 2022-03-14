public record HouseDetailDto(int Id, string? Address, string? Country,
    string? Description, int Price, string? Photo, IEnumerable<BidDto> Bids);
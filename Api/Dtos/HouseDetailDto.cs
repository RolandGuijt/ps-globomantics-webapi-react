public record HouseDetailDto(int Id, string? Address, string? Country,
    string? Description, int Price, IEnumerable<BidDto> Bids);
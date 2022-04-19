using System.ComponentModel.DataAnnotations;

public record BidDto(int Id, int HouseId, 
    [property: Required]string Bidder, int Amount);
using System.ComponentModel.DataAnnotations;

public record HouseDetailDto(int Id, [property: Required]string? Address, [property: Required]string? Country,
    string? Description, int Price, string? Photo);
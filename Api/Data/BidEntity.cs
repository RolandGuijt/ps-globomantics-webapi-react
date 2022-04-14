using System.ComponentModel.DataAnnotations.Schema;

public class BidEntity
{
    public int Id { get; set; }
    [ForeignKey("House")]
    public int HouseId { get; set; }
    public HouseEntity? House { get; set; }
    public string Bidder { get; set; } = string.Empty;
    public int Amount { get; set; }
}
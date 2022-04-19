using Microsoft.AspNetCore.Mvc;
using MiniValidation;

public static class WebApplicationBidExtensions
{
    public static void MapBidEndpoints(this WebApplication app)
    {
        app.MapGet("/house/{houseId:int}/bids", async (int houseId, 
            IHouseRepository houseRepo, IBidRepository bidRepo) =>
        {
            if (await houseRepo.Get(houseId) == null)
                return Results.Problem($"House with Id {houseId} not found", statusCode: 404);
            var bids = await bidRepo.Get(houseId);
            return Results.Ok(bids);
        }).ProducesProblem(404).Produces(StatusCodes.Status200OK);

        app.MapPost("/house/{houseId:int}/bids", async (int houseId, [FromBody] BidDto dto, IBidRepository repo) => 
        {   
            if (dto.HouseId != houseId)
                return Results.Problem($"House Id of DTO {dto.HouseId} doesn't match with URL data {houseId}", 
                    statusCode: StatusCodes.Status400BadRequest);
            if (!MiniValidator.TryValidate(dto, out var errors))
                return Results.ValidationProblem(errors);
            var newBid = await repo.Add(dto);
            return Results.Created($"/houses/{newBid.HouseId}/bids", newBid);
        }).ProducesValidationProblem().ProducesProblem(400).Produces<BidDto>(StatusCodes.Status201Created);
    }
}
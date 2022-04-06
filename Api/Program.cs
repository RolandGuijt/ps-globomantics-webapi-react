using Microsoft.AspNetCore.Mvc;
using MiniValidation;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddCors();

builder.Services.AddDbContext<HouseDbContext>(options => options.UseQueryTrackingBehavior(QueryTrackingBehavior.NoTracking));
builder.Services.AddScoped<IHouseRepository, HouseRepository>();
builder.Services.AddScoped<IBidRepository, BidRepository>();

var app = builder.Build();

app.UseSwagger();
app.UseSwaggerUI();

app.UseCors(p => p.WithOrigins("http://localhost:3000").AllowAnyHeader().AllowAnyMethod());

app.MapGet("/houses", (IHouseRepository repo) => repo.GetAll())
    .Produces<HouseDto[]>(StatusCodes.Status200OK);

app.MapGet("/house/{houseId:int}", async (int houseId, IHouseRepository repo) => 
{
    var house = await repo.Get(houseId);
    if (house == null)
        return Results.Problem($"House with ID {houseId} not found.", statusCode: 404);
    return Results.Ok(house);
}).ProducesProblem(404).Produces<HouseDetailDto>(StatusCodes.Status200OK);

app.MapPost("/houses", async ([FromBody] HouseDetailDto dto, IHouseRepository repo) => 
{
    if (!MiniValidator.TryValidate(dto, out var errors))
        return Results.ValidationProblem(errors);
    var newHouse = await repo.Add(dto);
    return Results.Created($"/house/{newHouse.Id}", newHouse);
}).ProducesValidationProblem().Produces<HouseDetailDto>(StatusCodes.Status201Created);

app.MapPut("/houses", async ([FromBody] HouseDetailDto dto, IHouseRepository repo) => 
{       
    if (!MiniValidator.TryValidate(dto, out var errors))
        return Results.ValidationProblem(errors);
    if (await repo.Get(dto.Id) == null)
        return Results.Problem($"House with Id {dto.Id} not found", statusCode: 404);
    return Results.Ok(await repo.Update(dto));
}).ProducesValidationProblem().ProducesProblem(404).Produces<HouseDetailDto>(StatusCodes.Status200OK);

app.MapDelete("/houses/{houseId:int}", async (int houseId, IHouseRepository repo) => 
{
    if (await repo.Get(houseId) == null)
        return Results.Problem($"House with Id {houseId} not found", statusCode: 404);
    await repo.Delete(houseId);
    return Results.Ok();
}).ProducesProblem(404).Produces(StatusCodes.Status200OK);

app.MapPost("/bids", async ([FromBody] BidDto dto, IBidRepository repo) => 
{
    if (!MiniValidator.TryValidate(dto, out var errors))
        return Results.ValidationProblem(errors);
    var newBid = await repo.Add(dto);
    return Results.Created($"/houses/{newBid.HouseId}", newBid);
}).ProducesValidationProblem().Produces<BidDto>(StatusCodes.Status201Created);;

app.Run();

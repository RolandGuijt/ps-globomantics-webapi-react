using Microsoft.AspNetCore.Mvc;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddDbContext<HouseDbContext>(options => options.UseQueryTrackingBehavior(QueryTrackingBehavior.NoTracking));
builder.Services.AddScoped<IHouseRepository, HouseRepository>();
builder.Services.AddScoped<IBidRepository, BidRepository>();

var app = builder.Build();

app.UseSwagger();
app.UseSwaggerUI();

app.MapGet("/houses", (IHouseRepository repo) => repo.GetAll());
app.MapPost("/houses", ([FromBody] HouseDto dto, IHouseRepository repo) => repo.Add(dto));
app.MapPut("/houses", ([FromBody] HouseDto dto, IHouseRepository repo) => repo.Update(dto));
app.MapDelete("/houses", ([FromBody] HouseDto dto, IHouseRepository repo) => repo.Delete(dto));

app.MapGet("/bids/{houseId:int}", (int houseId, IBidRepository repo) => repo.GetAll(houseId));
app.MapPost("/bids", ([FromBody] BidDto dto, IBidRepository repo) => repo.Add(dto));

app.Run();

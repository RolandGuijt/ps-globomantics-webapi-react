using Microsoft.AspNetCore.Mvc;

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

app.MapGet("/houses", (IHouseRepository repo) => repo.GetAll());
app.MapGet("/house/{houseId:int}", (int houseId, IHouseRepository repo) => repo.Get(houseId));
app.MapPost("/houses", ([FromBody] HouseDetailDto dto, IHouseRepository repo) => repo.Add(dto));
app.MapPut("/houses", ([FromBody] HouseDetailDto dto, IHouseRepository repo) => repo.Update(dto));
app.MapDelete("/houses/{houseId:int}", (int houseId, IHouseRepository repo) => repo.Delete(houseId));

app.MapPost("/bids", ([FromBody] BidDto dto, IBidRepository repo) => repo.Add(dto));

app.Run();

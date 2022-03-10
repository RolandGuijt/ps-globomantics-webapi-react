var builder = WebApplication.CreateBuilder(args);
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddDbContext<HouseDbContext>(options => options.UseQueryTrackingBehavior(QueryTrackingBehavior.NoTracking));
builder.Services.AddScoped<IHouseRepository, HouseRepository>();
builder.Services.AddScoped<IBidRepository, BidRepository>();

var app = builder.Build();

app.UseSwagger();
app.UseSwaggerUI();

app.MapGet("/houses", (HouseRepository repo) => repo.GetAll());
app.MapPost("/houses", (HouseDto dto, HouseRepository repo) => repo.Add(dto));
app.MapPut("/houses", (HouseDto dto, HouseRepository repo) => repo.Update(dto));
app.MapDelete("/houses", (HouseDto dto, HouseRepository repo) => repo.Delete(dto));

app.MapGet("/bids", (BidRepository repo) => repo.GetAll());
app.MapPost("/bids", (BidDto dto, BidRepository repo) => repo.Add(dto));

app.Run();

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddDbContext<HouseDbContext>();

var app = builder.Build();
app.UseSwagger();
app.UseSwaggerUI();

app.MapGet("/houses", (HouseRepository repo) => repo.GetAll());

app.Run();

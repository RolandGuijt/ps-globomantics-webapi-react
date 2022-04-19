using Microsoft.AspNetCore.Authentication.Cookies;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddControllersWithViews();
//builder.Services.AddCors();

builder.Services.AddBff(o => o.ManagementBasePath = "/account")
    .AddServerSideSessions();

builder.Services.AddAuthentication(o => 
{
    o.DefaultScheme = CookieAuthenticationDefaults.AuthenticationScheme;
    o.DefaultChallengeScheme = "oidc";
    o.DefaultSignOutScheme = "oidc";
})
    .AddCookie(o => 
    {
        o.Cookie.Name = "__Host-spa";
        o.Cookie.SameSite = SameSiteMode.Strict;

        o.Events.OnRedirectToLogin = (context) =>
        {
            context.Response.StatusCode = StatusCodes.Status401Unauthorized;
            return Task.CompletedTask;
        };
    })
    .AddOpenIdConnect("oidc", options =>
    {
        options.Authority = "https://localhost:5001";

        // confidential client using code flow + PKCE + query response mode
        options.ClientId = "confarchweb";
        options.ClientSecret = "secret";
        options.ResponseType = "code";
        options.ResponseMode = "query";
        options.UsePkce = true;

        options.MapInboundClaims = false;
        options.GetClaimsFromUserInfoEndpoint = true;

        // save access and refresh token to enable automatic lifetime management
        options.SaveTokens = true;

        // request scopes
        options.Scope.Add("confArchApi.basicAccess");
        options.Scope.Add("roles");

        // request refresh token
        options.Scope.Add("offline_access");
    });
builder.Services.AddAuthorization(o => 
    o.AddPolicy("admin", p => p.RequireClaim("role", "Admin"))
);

builder.Services.AddDbContext<HouseDbContext>(options => options.UseQueryTrackingBehavior(QueryTrackingBehavior.NoTracking));
builder.Services.AddScoped<IHouseRepository, HouseRepository>();
builder.Services.AddScoped<IBidRepository, BidRepository>();

var app = builder.Build();

app.UseSwagger();
app.UseSwaggerUI();
app.UseStaticFiles();
app.UseAuthentication();

//app.UseCors(p => p.WithOrigins("http://localhost:3000").AllowAnyHeader().AllowAnyMethod());

app.MapHouseEndpoints();
app.MapBidEndpoints();
app.UseRouting();
app.UseBff();
app.UseAuthorization();
app.UseEndpoints(e => e.MapBffManagementEndpoints());
app.MapFallbackToFile("index.html");

app.Run();


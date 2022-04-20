using Duende.Bff.Yarp;
using Microsoft.AspNetCore.Authentication.Cookies;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddBff(o => o.ManagementBasePath = "/account")
    .AddRemoteApis()
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
        options.ClientId = "globoweb";
        options.ClientSecret = "secret";
        options.ResponseType = "code";
        options.ResponseMode = "query";
        options.UsePkce = true;

        options.MapInboundClaims = false;
        options.GetClaimsFromUserInfoEndpoint = true;

        // save access and refresh token to enable automatic lifetime management
        options.SaveTokens = true;

        // request scopes
        options.Scope.Add("globoApi.basicAccess");
        options.Scope.Add("roles");

        // request refresh token
        options.Scope.Add("offline_access");
    });

var app = builder.Build();

app.UseStaticFiles();
app.UseAuthentication();
app.UseRouting();
app.UseBff();
app.UseEndpoints(e => 
{
    e.MapBffManagementEndpoints(); e.MapRemoteBffApiEndpoint("/api", "https://localhost:4000")
        .RequireAccessToken();
});
app.MapFallbackToFile("index.html");
app.Run();

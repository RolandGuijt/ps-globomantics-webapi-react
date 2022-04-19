// Copyright (c) Brock Allen & Dominick Baier. All rights reserved.
// Licensed under the Apache License, Version 2.0. See LICENSE in the project root for license information.


using System.Collections.Generic;
using Duende.IdentityServer.Models;

namespace Part2_TokenService
{
    public static class Config
    {
        public static IEnumerable<IdentityResource> IdentityResources =>
            new IdentityResource[]
            {
                new IdentityResources.OpenId(),
                new IdentityResources.Profile(),
                new IdentityResource(name: "roles", 
                    userClaims: new[] { "role" }, displayName: "Your roles")
            };

        public static IEnumerable<ApiScope> ApiScopes =>
            new ApiScope[]
            {
                new ApiScope("confArchApi.basicAccess", "Basic access to ConfArch API")
            };

        public static IEnumerable<ApiResource> ApiResources =>
            new ApiResource[]
            {
                new ApiResource
                {
                    Name = "confArchApi",
                    Description = "ConfArch API",
                    Scopes = new List<string> {"confArchApi.basicAccess" }
                }

            };

        public static IEnumerable<Client> Clients =>
            new Client[]
            {
                new Client
                {
                    ClientId = "ExternalApiClient",
                    ClientSecrets =
                    {
                        new Secret("secret".Sha256())
                    },
                    AllowedScopes = {"confArchApi.basicAccess"},
                    AllowedGrantTypes = GrantTypes.ClientCredentials
                },

                // interactive client using code flow + pkce
                new Client
                {
                    ClientId = "confarchweb",
                    ClientName = "ConfArch MVC Client",
                    RequireConsent = true,
                   

                    ClientSecrets =
                    {
                        new Secret("secret".Sha256())
                    },

                    RedirectUris = {"https://localhost:4000/signin-oidc"},
                    PostLogoutRedirectUris = {"https://localhost:4000"},

                    AllowedScopes =
                    {
                        "openid",
                        "roles",
                        "profile",
                        "confArchApi.basicAccess",
                    },
                    
                    AlwaysIncludeUserClaimsInIdToken = true,
                    AllowedGrantTypes = GrantTypes.Code,
                    RequirePkce = true,
                    AllowOfflineAccess = true
                },
            };
    }
}
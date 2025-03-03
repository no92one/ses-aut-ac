using System.Text.Json;
using server.Classes;

namespace server.Extensions;

public static class EndpointExtensions
{
    public static RouteHandlerBuilder RequireRole(this RouteHandlerBuilder builder, Role role)
    {
        return builder.AddEndpointFilter(async (context, next) =>
        {
            var httpContext = context.HttpContext;
            var userJson = httpContext.Session.GetString("User");

            if (userJson == null)
            {
                return Results.Unauthorized();
            }

            var user = JsonSerializer.Deserialize<User>(userJson);
            if (user?.Role != role)
            {
                return Results.StatusCode(403);
            }

            return await next(context);
        });
    }
}
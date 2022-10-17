using e_shop.Data;
using e_shop.Extensions;
using e_shop.Middleware;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.FileProviders;
using StackExchange.Redis;

var builder = WebApplication.CreateBuilder(args);
var config = builder.Configuration;

// Add services to the container.

builder.Services.AddControllers();
builder.Services.AddDbContext<StoreContext>(options =>
{
  var env = Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT");

  string connStr;

  // Depending on if in development or production, use either Heroku-provided
  // connection string, or development connection string from env var.
  if (env == "Development")
  {
    // Use connection string from file.
    connStr = config.GetConnectionString("DefaultConnection");
  }
  else
  {
    var connUrl = Environment.GetEnvironmentVariable("DATABASE_URL");

    connUrl = connUrl.Replace("postgres://", string.Empty);
    var pgUserPass = connUrl.Split("@")[0];
    var pgHostPortDb = connUrl.Split("@")[1];
    var pgHostPort = pgHostPortDb.Split("/")[0];
    var pgDb = pgHostPortDb.Split("/")[1];
    var pgUser = pgUserPass.Split(":")[0];
    var pgPass = pgUserPass.Split(":")[1];
    var pgHost = pgHostPort.Split(":")[0];
    var pgPort = pgHostPort.Split(":")[1];

    connStr = $"Server={pgHost};Port={pgPort};User Id={pgUser};Password={pgPass};Database={pgDb};Sslmode=Prefer;Trust Server Certificate=true;";
  }

  options.UseNpgsql(connStr);
});


builder.Services.AddSingleton<IConnectionMultiplexer>(c =>
{
  var env = Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT");

  ConfigurationOptions configuration = null;

  if (env == "Development")
  {
    configuration = ConfigurationOptions.Parse(config.GetConnectionString("Redis"), true);
  }
  else
  {
    var tokens = Environment.GetEnvironmentVariable("REDIS_URL").Split(':', '@');
    configuration = ConfigurationOptions.Parse(string.Format("{0}:{1},password={2}", tokens[3], tokens[4],
      tokens[2]), true);
  }

  return ConnectionMultiplexer.Connect(configuration);
});

builder.Services.AddApplicationServices();
builder.Services.AddIdentityServices(config);

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerDocumentation();
builder.Services.AddCors(opt =>
{
  opt.AddPolicy("CorsPolicy", policy =>
  {
    policy.AllowAnyHeader().AllowAnyMethod().WithOrigins("https://localhost:4200");
  });
});


var app = builder.Build();

// Migrate any database changes on startup (includes initial db creation)
using (var scope = app.Services.CreateScope())
{
  var services = scope.ServiceProvider;
  var loggerFactory = services.GetRequiredService<ILoggerFactory>();
  try
  {
    var context = services.GetRequiredService<StoreContext>();
    await context.Database.MigrateAsync();
    await StoreContextSeed.SeedAsync(context, loggerFactory);

    //var userManager = services.GetRequiredService<UserManager<AppUser>>();
    //var identityContext = services.GetRequiredService<AppIdentityDbContext>();
    //await identityContext.Database.MigrateAsync();
    //await AppIdentityDbContextSeed.SeedUsersAsync(userManager);
  }
  catch (Exception ex)
  {
    var logger = loggerFactory.CreateLogger<Program>();
    logger.LogError(ex, "An error occured during migration");
  }
}

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
  app.UseSwagger();
  app.UseSwaggerUI();
}

app.UseMiddleware<ExceptionMiddleware>();

app.UseStatusCodePagesWithReExecute("/errors/{0}");

app.UseHttpsRedirection();
app.UseRouting();
app.UseStaticFiles();
app.UseStaticFiles(new StaticFileOptions
{
  FileProvider = new PhysicalFileProvider(
    Path.Combine(Directory.GetCurrentDirectory(), "Content")),
  RequestPath = "/content"
});

app.UseCors("CorsPolicy");

app.UseAuthentication();
app.UseAuthorization();

app.UseSwaggerDocumentation();

app.MapControllers();
app.MapFallbackToController("Index", "Fallback");


app.Run();

using Wfdf.Api.Service;
using Wfdf.Core;
using Wfdf.Core.Service;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddSingleton<WfdfDatabase>(x => new WfdfDatabase(builder.Configuration.GetConnectionString("MongoDb")));
builder.Services.AddSingleton<RedisService>(x => new RedisService(builder.Configuration.GetConnectionString("Redis")));
builder.Services.AddSingleton<WfdfHttpClient>();
builder.Services.AddTransient<ItemService>();
builder.Services.AddTransient<StatService>();
builder.Services.AddTransient<MarketService>();
builder.Services.AddCors(options =>
{
    options.AddPolicy("ReactApp", policy =>
    {
        policy.WithOrigins(builder.Configuration["ReactAppDomain"]);
    });
});

var app = builder.Build();
if (!string.IsNullOrWhiteSpace(builder.Configuration["PORT"]))
{
    app.Urls.Add("http://*:" + builder.Configuration["PORT"]);
}

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseCors("ReactApp");

app.UseAuthorization();

app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Home}/{action=Index}/{id?}");


app.Run();

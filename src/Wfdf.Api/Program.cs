using StackExchange.Redis;
using Wfdf.Core;
using Wfdf.Core.Services;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddSingleton<WfdfDatabase>(x => new WfdfDatabase(builder.Configuration.GetConnectionString("MongoDb")));
builder.Services.AddSingleton<WfdfRedis>(x => new WfdfRedis(builder.Configuration.GetConnectionString("Redis")));
builder.Services.AddTransient<ItemsService>();
builder.Services.AddCors(options =>
{
    options.AddPolicy("ReactApp", policy =>
    {
        policy.WithOrigins(builder.Configuration["ReactAppDomain"]);
    });
});

var app = builder.Build();

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

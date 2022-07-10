using Wfdf.Api.Service;
using Wfdf.Core;
using Wfdf.Core.Config;
using Wfdf.Core.Service;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.Configure<MongoDbConfig>(builder.Configuration.GetSection("MongoDb"));
builder.Services.Configure<RedisConfig>(builder.Configuration.GetSection("Redis"));
builder.Services.AddSingleton<WfdfDatabase>();
builder.Services.AddSingleton<RedisService>();
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
    // app.UseDeveloperExceptionPage();
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseExceptionHandler("/error");
app.UseHttpsRedirection();
app.UseCors("ReactApp");
app.UseAuthorization();

app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Home}/{action=Index}/{id?}");

app.Run();

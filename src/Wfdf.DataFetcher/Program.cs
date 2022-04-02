using Wfdf.Core;
using System.Text.Json;
using MongoDB.Driver;
using Microsoft.Extensions.Configuration;

var configuration = new ConfigurationBuilder()
    .SetBasePath(Directory.GetCurrentDirectory())
    .AddJsonFile("appsettings.json", true, true)
    .AddEnvironmentVariables()
    .Build();

HttpClient client = new HttpClient();
client.DefaultRequestHeaders.Add("User-Agent", "wfdf-data-fetcher/1.0");

MongoClient dbClient = new MongoClient(configuration.GetConnectionString("MongoDB"));

bool shouldForce = Environment.GetCommandLineArgs().Contains("--force");
if (!shouldForce) {
    // Check if we've already updated for the most recent git commit
    var response = await client.GetAsync("https://api.github.com/repos/WFCD/warframe-items/commits/master");
    response.EnsureSuccessStatusCode();

    var jsonString = await response.Content.ReadAsStringAsync();
    GithubCommit json = JsonSerializer.Deserialize<GithubCommit>(jsonString) ?? throw new Exception("Failed to fetch commit data");
    System.Console.WriteLine($"Current commit sha: {json.sha}");
}

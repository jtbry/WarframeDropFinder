using Wfdf.Core.Models;
using Wfdf.Core.Services;
using System.Text.Json;
using Microsoft.Extensions.Configuration;
using MongoDB.Driver;

var configuration = new ConfigurationBuilder()
    .SetBasePath(Directory.GetCurrentDirectory())
    .AddJsonFile("appsettings.json", true, true)
    .AddEnvironmentVariables()
    .Build();

HttpClient httpClient = new HttpClient();
httpClient.DefaultRequestHeaders.Add("User-Agent", "wfdf-data-fetcher/1.0");

MongoClient dbClient = new MongoClient(configuration.GetConnectionString("MongoDb"));
IMongoDatabase db = dbClient.GetDatabase("wfdf");

bool shouldForce = Environment.GetCommandLineArgs().Contains("--force");
GithubCommit currentCommit;
if (!shouldForce) {
    // Check if we've already updated for the most recent git commit
    var response = await httpClient.GetAsync("https://api.github.com/repos/WFCD/warframe-items/commits/master");
    response.EnsureSuccessStatusCode();

    var jsonString = await response.Content.ReadAsStringAsync();
    currentCommit = JsonSerializer.Deserialize<GithubCommit>(jsonString) ?? throw new Exception("Failed to fetch commit data");

    UpdatesService updatesServices = new UpdatesService(db);
    var existingCommit = await updatesServices.GetCommitBySha(currentCommit.sha);
    if (existingCommit is not null) {
        Console.WriteLine("Already updated to commit " + existingCommit.sha);
        return;
    }
    await updatesServices.AddCommit(currentCommit);
    System.Console.WriteLine("Added commit " + currentCommit.sha);
}

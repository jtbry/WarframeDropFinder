using Wfdf.Core;
using Wfdf.Core.Models;
using Wfdf.Core.Services;
using System.Text.Json;
using Microsoft.Extensions.Configuration;
using MongoDB.Driver;

// Build configation from json file and evironment variables
var configuration = new ConfigurationBuilder()
    .SetBasePath(Directory.GetCurrentDirectory())
    .AddJsonFile("appsettings.json", true, true)
    .AddEnvironmentVariables()
    .Build();

// Create http client
HttpClient httpClient = new HttpClient();
httpClient.DefaultRequestHeaders.Add("User-Agent", "wfdf-data-fetcher/1.0");

// Create mongo client and updates services
WfdfDatabase dbClient = new WfdfDatabase(configuration.GetConnectionString("MongoDb"));
UpdatesService updatesService = new UpdatesService(dbClient);

// Get current commit
bool shouldForce = Environment.GetCommandLineArgs().Contains("--force");
GithubCommit currentCommit;
var response = await httpClient.GetAsync("https://api.github.com/repos/WFCD/warframe-items/commits/master");
if (response.StatusCode == System.Net.HttpStatusCode.Forbidden)
{
    System.Console.WriteLine("Rate limit hit, forcing currentCommit to master");
    currentCommit = new GithubCommit {
        sha = "master",
    };
    shouldForce = true;
}
else 
{
    response.EnsureSuccessStatusCode();
    var jsonString = await response.Content.ReadAsStringAsync();
    currentCommit = JsonSerializer.Deserialize<GithubCommit>(jsonString) ?? throw new Exception("Failed to fetch commit data");
}

// Check if we should update
if (!shouldForce)
{
    // Check if we've already updated for the most recent git commit
    var existingCommit = await updatesService.GetUpdateByCommitSha(currentCommit.sha);
    if (existingCommit is not null)
    {
        Console.WriteLine("Already updated to commit " + existingCommit.commitSha);
        return;
    }
}

Console.WriteLine("Updating to sha " + currentCommit.sha);
ItemsService itemsService = new ItemsService(dbClient);
List<string> whitelist = new List<string> { "Arcanes", "Melee", "Mods", "Primary", "Relics", "Secondary", "Sentinels", "SentinelWeapons", "Warframes" };

// TODO: handle il8n file
// Fill update file list
List<string> rawUrls = new List<string>();
// Create rawUrls for all categories
foreach (var category in whitelist)
{
    rawUrls.Add($"https://raw.githubusercontent.com/WFCD/warframe-items/{currentCommit.sha}/data/json/{category}.json");
}

var startTime = DateTime.Now;
// TODO: fix category results, currently full inserts report a 0 and all items are marked as modified
List<WfdfCategoryUpdateResult> categoryResults = new List<WfdfCategoryUpdateResult>();
foreach (var rawUrl in rawUrls)
{
    // TODO: handle item deletions
    ItemFileParser parser = new ItemFileParser(rawUrl, httpClient);
    var items = await parser.Parse();
    var result = await itemsService.UpsertManyItems(items);
    categoryResults.Add(new WfdfCategoryUpdateResult
    {
        category = rawUrl.Split('/').Last().Split('.').First(),
        itemsModified = result.ModifiedCount,
        itemsInserted = result.InsertedCount,
        itemsDeleted = result.DeletedCount,
    });
    System.Console.WriteLine("Updated " + items.Count + " items from " + rawUrl.Split('/').Last());
}

var endTime = DateTime.Now;
var wfdfUpdate = new WfdfUpdate
{
    commitSha = currentCommit.sha,
    isForced = shouldForce,
    updatedCategories = categoryResults,
    secondsTaken = (int)(endTime - startTime).TotalSeconds,
};
await updatesService.AddWfdfUpdate(wfdfUpdate);
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Wfdf.Core;
using Wfdf.Core.Config;
using Wfdf.Core.Models;
using Wfdf.Core.Service;

using var loggerFactory = LoggerFactory.Create(options =>
{
    options.AddConsole();
});
var logger = loggerFactory.CreateLogger<Program>();

var configuration = new ConfigurationBuilder()
    .SetBasePath(Directory.GetCurrentDirectory())
    .AddJsonFile("appsettings.json", true, true)
    .AddEnvironmentVariables()
    .Build();
MongoDbConfig mongoDbConfig = new MongoDbConfig();
configuration.Bind("MongoDb", mongoDbConfig);

WfdfHttpClient httpClient = new WfdfHttpClient();
WfdfDatabase database = new WfdfDatabase(Options.Create<MongoDbConfig>(mongoDbConfig));
GithubService githubService = new GithubService(httpClient, loggerFactory.CreateLogger<GithubService>());
UpdateService updateService = new UpdateService(database);
ItemService itemService = new ItemService(database, loggerFactory.CreateLogger<ItemService>());
FileProcessingService fileProcessingService = new FileProcessingService(loggerFactory.CreateLogger<FileProcessingService>(), itemService, httpClient);

GithubCommit commit = await githubService.GetGithubCommitAsync();

bool shouldForce = Environment.GetCommandLineArgs().Contains("--force");
if (!shouldForce)
{
    WfdfUpdate update = await updateService.GetUpdateByShaAsync(commit.sha);
    if (update is not null)
    {
        logger.LogInformation("Wfdf is already up to date with commit " + commit.shortSha);
        return;
    }
}
else
{
    commit.isForced = true;
}

logger.LogInformation("Updating Wfdf to commit " + commit.shortSha);
await fileProcessingService.ProcessFilesAsync(commit);
await updateService.AddUpdateAsync(new WfdfUpdate
{
    commitSha = commit.sha,
    isForced = commit.isForced
});
logger.LogInformation("Wfdf is now up to date with commit " + commit.shortSha);
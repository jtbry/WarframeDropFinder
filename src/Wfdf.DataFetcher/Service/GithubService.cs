
using System.Text.Json;
using Microsoft.Extensions.Logging;
using Wfdf.Core.Models;

public class GithubService
{
    private readonly HttpClient _httpClient;
    private readonly ILogger<GithubService> _logger;

    public GithubService(HttpClient httpClient, ILogger<GithubService> logger)
    {
        _httpClient = httpClient;
        _logger = logger;
    }

    public async Task<GithubCommit> GetGithubCommitAsync()
    {
        var response = await _httpClient.GetAsync("https://api.github.com/repos/WFCD/warframe-items/commits/master");
        if (response.StatusCode == System.Net.HttpStatusCode.Forbidden)
        {
            _logger.LogWarning("GitHub Rate limit hit, forcing currentCommit to master");
            return new GithubCommit
            {
                sha = "master",
                isForced = true
            };
        }
        else
        {
            response.EnsureSuccessStatusCode();
            var jsonString = await response.Content.ReadAsStringAsync();
            return JsonSerializer.Deserialize<GithubCommit>(jsonString) ?? throw new Exception("Failed to fetch commit data");
        }
    }
}
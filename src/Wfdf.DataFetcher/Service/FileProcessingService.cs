using System.Diagnostics;
using System.Text.Json;
using Microsoft.Extensions.Logging;
using Wfdf.Core.Models;
using Wfdf.Core.Service;

public class FileProcessingService
{
    private readonly ILogger<FileProcessingService> _logger;
    private readonly ItemService _itemService;
    private readonly WfdfHttpClient _httpClient;
    private readonly List<string> fileWhitelist =
        new List<string> { "Arcanes", "Melee", "Mods", "Primary", "Relics", "Secondary", "Sentinels", "SentinelWeapons", "Warframes" };

    public FileProcessingService(ILogger<FileProcessingService> logger, ItemService itemService, WfdfHttpClient httpClient)
    {
        _logger = logger;
        _itemService = itemService;
        _httpClient = httpClient;
    }

    public async Task ProcessFilesAsync(GithubCommit currentCommit)
    {
        var stopwatch = new Stopwatch();
        foreach (var file in fileWhitelist)
        {
            try
            {
                stopwatch.Start();

                string rawFileUrl = $"https://raw.githubusercontent.com/WFCD/warframe-items/{currentCommit.sha}/data/json/{file}.json";
                int count = await ProcessFileAsync(rawFileUrl);

                stopwatch.Stop();
                _logger.LogInformation($"Processed {count} items in {file} ({stopwatch.ElapsedMilliseconds / 1000.0}s).");
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Failed to process file {file}");
            }

        }
    }

    private async Task<int> ProcessFileAsync(string rawFileUrl)
    {
        var response = await _httpClient.GetAsync(rawFileUrl);
        response.EnsureSuccessStatusCode();

        var jsonString = await response.Content.ReadAsStringAsync();
        var deserializeOptions = new JsonSerializerOptions
        {
            Converters = { new ItemJsonConverter() }
        };
        var items = JsonSerializer.Deserialize<List<Item>>(jsonString, deserializeOptions) ?? new List<Item>();

        await _itemService.UpsertItemsAsync(items);

        return items.Count;
    }
}
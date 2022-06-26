using System.Text.Json;
using Wfdf.Api.Model;
using Wfdf.Core.Service;

namespace Wfdf.Api.Service;

public class MarketService
{
    private readonly WfdfHttpClient _httpClient;
    private readonly ILogger<MarketService> _logger;

    public MarketService(WfdfHttpClient httpClient, ILogger<MarketService> logger)
    {
        _httpClient = httpClient;
        _logger = logger;
    }

    public async Task<IEnumerable<WfmOrder>?> GetOrdersForItem(string itemName)
    {
        // TODO: add caching
        try
        {
            var requestUrl = $"https://api.warframe.market/v1/items/{itemName}/orders";
            var orderResponse = await _httpClient.GetFromJsonAsync<WfmOrderResponse>(requestUrl);
            return orderResponse?.payload?.orders;
        }
        catch (Exception ex)
        {
            _logger.LogError($"{itemName}: {ex.Message}");
            return null;
        }
    }
}
using System.Text.Json;
using Wfdf.Api.Model;
using Wfdf.Core.Config;
using Wfdf.Core.Service;

namespace Wfdf.Api.Service;

public class MarketService
{
    private readonly WfdfHttpClient _httpClient;
    private readonly JsonSerializerOptions _wfmSerializerOptions;

    public MarketService(WfdfHttpClient httpClient, ILogger<MarketService> logger)
    {
        _httpClient = httpClient;
        _wfmSerializerOptions = new JsonSerializerOptions
        {
            PropertyNamingPolicy = new WfmJsonNamingPolicy()
        };
    }

    public async Task<IEnumerable<WfmOrder>> GetOrdersAsync(string itemName)
    {
        // TODO: add caching
        var requestUrl = $"https://api.warframe.market/v1/items/{itemName}/orders";
        var orderResponse = await _httpClient.GetFromJsonAsync<WfmResponse<OrderDataPayload>>(requestUrl, _wfmSerializerOptions);

        if (orderResponse is null
            || orderResponse.Payload is null
            || orderResponse.Payload.Orders is null)
        {
            throw new InvalidWfmResponseException("orderResponse or nested field is null");
        }
        return orderResponse.Payload.Orders;
    }

    public async Task<IEnumerable<WfmPriceData>> GetPriceDataAsync(string itemName)
    {
        var requestUrl = $"https://api.warframe.market/v1/items/{itemName}/statistics";
        var priceResponse = await _httpClient.GetFromJsonAsync<WfmResponse<PriceDataPayload>>(requestUrl, _wfmSerializerOptions);

        if (priceResponse is null
            || priceResponse.Payload is null
            || priceResponse.Payload.RecentPrices is null)
        {
            throw new InvalidWfmResponseException("priceResponse or a nested field is null");
        }
        return priceResponse.Payload.RecentPrices.TakeLast(2);
    }
}
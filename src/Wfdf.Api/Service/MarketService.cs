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
        try
        {
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
        catch (HttpRequestException ex)
        {
            if (ex.StatusCode == System.Net.HttpStatusCode.NotFound)
            {
                return new List<WfmOrder>();
            }
            throw ex;
        }
    }

    public async Task<IEnumerable<WfmPriceData>> GetPriceDataAsync(string itemName)
    {
        try
        {
            var requestUrl = $"https://api.warframe.market/v1/items/{itemName}/statistics";
            var priceResponse = await _httpClient.GetFromJsonAsync<WfmResponse<PriceDataPayload>>(requestUrl, _wfmSerializerOptions);

            if (priceResponse is null
                || priceResponse.Payload is null
                || priceResponse.Payload.RecentPrices is null
                || priceResponse.Payload.HistoricalPrices is null)
            {
                throw new InvalidWfmResponseException("priceResponse or a nested field is null");
            }
            if (!priceResponse.Payload.RecentPrices.Any())
            {
                return priceResponse.Payload.HistoricalPrices.TakeLast(2);
            }
            return priceResponse.Payload.RecentPrices.TakeLast(2);
        }
        catch (HttpRequestException ex)
        {
            if (ex.StatusCode == System.Net.HttpStatusCode.NotFound)
            {
                return new List<WfmPriceData>();
            }
            throw ex;
        }
    }
}
using System.Text.Json.Serialization;

namespace Wfdf.Api.Model;

public class PriceDataPayload
{
    public class StatsPayload
    {
        [JsonPropertyName("48hours")]
        public IEnumerable<WfmPriceData>? RecentPrices { get; set; }
        [JsonPropertyName("90days")]
        public IEnumerable<WfmPriceData>? HistoricalPrices { get; set; }
    }

    [JsonPropertyName("statistics_live")]
    public StatsPayload? Stats { get; set; }

    public IEnumerable<WfmPriceData>? RecentPrices => Stats?.RecentPrices;
    public IEnumerable<WfmPriceData>? HistoricalPrices => Stats?.HistoricalPrices;
}
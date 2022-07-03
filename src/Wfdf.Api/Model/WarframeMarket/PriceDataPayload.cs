using System.Text.Json.Serialization;

namespace Wfdf.Api.Model;

public class PriceDataPayload
{
    public class StatsPayload
    {
        [JsonPropertyName("48hours")]
        public IEnumerable<WfmPriceData>? RecentPrices { get; set; }
    }

    [JsonPropertyName("statistics_live")]
    public StatsPayload? Stats { get; set; }

    public IEnumerable<WfmPriceData>? RecentPrices => Stats?.RecentPrices;
}
using System.Text.Json.Serialization;

namespace Wfdf.Api.Model;

public class WfmPriceResponse
{
    public class StatisticsPayload
    {
        [JsonPropertyName("48hours")]
        public IEnumerable<WfmPriceData>? Recent { get; set; }
    }

    public class PricePayload
    {
        [JsonPropertyName("statistics_live")]
        public StatisticsPayload? Live { get; set; }
    }

    public PricePayload? Payload { get; set; }

    public IEnumerable<WfmPriceData>? Recent => Payload?.Live?.Recent;
}
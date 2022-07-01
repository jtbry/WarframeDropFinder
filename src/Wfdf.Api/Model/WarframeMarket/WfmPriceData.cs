using System.Text.Json.Serialization;

namespace Wfdf.Api.Model;

public class WfmPriceData
{
    [JsonPropertyName("datetime")]
    public DateTime Timestamp { get; set; }
    public int Volume { get; set; }
    [JsonPropertyName("min_price")]
    public double MinPrice { get; set; }
    [JsonPropertyName("max_price")]
    public double MaxPrice { get; set; }
    [JsonPropertyName("avg_price")]
    public double AvgPrice { get; set; }
    public double Median { get; set; }
    [JsonPropertyName("order_type")]
    public string? OrderType { get; set; }
}
namespace Wfdf.Api.Model;

public record WfmPriceData
{
    public DateTime Datetime { get; init; }
    public int Volume { get; init; }
    public double MinPrice { get; init; }
    public double MaxPrice { get; init; }
    public double AvgPrice { get; init; }
    public double Median { get; init; }
    public string? OrderType { get; init; }
}
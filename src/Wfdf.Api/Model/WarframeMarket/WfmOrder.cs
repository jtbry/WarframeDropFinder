namespace Wfdf.Api.Model;

public record WfmOrder
{
    public DateTime CreationDate { get; init; }
    public int Quantity { get; init; }
    public int Platinum { get; init; }
    public string OrderType { get; init; } = "N/A";
    public string Platform { get; init; } = "N/A";
}
namespace Wfdf.Core.Models;

public record DropSource
{
    public float? chance { get; init; } = 0;
    public string location { get; init; } = string.Empty;
    public string rarity { get; init; } = string.Empty;
    public string type { get; init; } = string.Empty;
}
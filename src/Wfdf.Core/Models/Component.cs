namespace Wfdf.Core.Models;

public record Component
{
    public string uniqueName { get; init; } = string.Empty;
    public string name { get; init; } = string.Empty;
    public string description { get; init; } = "N/A";
    public string imageName { get; init; } = string.Empty;
    public bool tradable { get; init; }
    public int itemCount { get; init; }
    public IEnumerable<DropSource> drops { get; init; } = new List<DropSource>();
}
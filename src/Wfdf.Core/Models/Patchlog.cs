namespace Wfdf.Core.Models;

public record Patchlog
{
    public string name { get; init; } = string.Empty;
    public DateTime date { get; init; } = DateTime.MinValue;
    public string url { get; init; } = string.Empty;
    public string additions { get; init; } = string.Empty;
    public string changes { get; init; } = string.Empty;
    public string fixes { get; init; } = string.Empty;
}
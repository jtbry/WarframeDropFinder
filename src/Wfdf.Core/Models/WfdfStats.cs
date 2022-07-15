namespace Wfdf.Core.Models;

public record WfdfStats
{
    public long totalItems { get; init; }
    public long tradableItems { get; init; }
    public long totalRelics { get; init; }
    public long totalMods { get; init; }
}
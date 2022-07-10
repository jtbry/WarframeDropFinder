using MongoDB.Bson.Serialization.Attributes;

namespace Wfdf.Core.Models;

[BsonIgnoreExtraElements]
public record WfdfUpdate
{
    public string commitSha { get; init; } = "N/A";
    public Boolean isForced { get; init; } = false;
    public IEnumerable<WfdfCategoryUpdateResult> updatedCategories { get; init; } = new List<WfdfCategoryUpdateResult>();
    public DateTime timestamp { get; init; } = DateTime.Now;
    public int secondsTaken { get; init; } = 0;
}

public record WfdfCategoryUpdateResult
{
    public string category { get; init; } = string.Empty;
    public long itemsModified { get; init; } = 0;
    public long itemsInserted { get; init; } = 0;
    public long itemsDeleted { get; init; } = 0;
}
using MongoDB.Bson.Serialization.Attributes;

namespace Wfdf.Core.Models;

[BsonIgnoreExtraElements]
public class WfdfUpdate
{
    public string commitSha { get; set; } = "N/A";
    public Boolean isForced { get; set; } = false;
    public IEnumerable<WfdfCategoryUpdateResult> updatedCategories { get; set; } = new List<WfdfCategoryUpdateResult>();
    public DateTime timestamp { get; set; } = DateTime.Now;
    public int secondsTaken { get; set; } = 0;
}

public class WfdfCategoryUpdateResult
{
    public string category { get; set; } = string.Empty;
    public long itemsModified { get; set; } = 0;
    public long itemsInserted { get; set; } = 0;
    public long itemsDeleted { get; set; } = 0;
}
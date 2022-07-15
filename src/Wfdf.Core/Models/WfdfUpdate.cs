using MongoDB.Bson.Serialization.Attributes;

namespace Wfdf.Core.Models;

[BsonIgnoreExtraElements]
public record WfdfUpdate
{
    public string commitSha { get; init; } = "N/A";
    public Boolean isForced { get; init; } = false;
    public DateTime timestamp { get; init; } = DateTime.Now;
}

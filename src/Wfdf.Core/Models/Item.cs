using MongoDB.Bson.Serialization.Attributes;

namespace Wfdf.Core.Models;

[BsonIgnoreExtraElements]
public record Item
{
    public string uniqueName { get; init; } = string.Empty;
    public string name { get; init; } = string.Empty;
    public string description { get; init; } = "N/A";
    public string category { get; init; } = string.Empty;
    public bool tradable { get; init; } = false;
    public string wikiaUrl { get; init; } = string.Empty;
    public string imageName { get; init; } = string.Empty;
    public bool vaulted { get; init; } = false;
    public IEnumerable<Patchlog> patchlogs { get; init; } = new List<Patchlog>();
    public IEnumerable<DropSource> drops { get; init; } = new List<DropSource>();
    public IEnumerable<Component> components { get; init; } = new List<Component>();
}
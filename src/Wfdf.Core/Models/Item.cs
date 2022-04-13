using MongoDB.Bson.Serialization.Attributes;

namespace Wfdf.Core.Models;

[BsonIgnoreExtraElements]
public class Item
{
    public string uniqueName { get; set; } = string.Empty;
    public string name { get; set; } = string.Empty;
    public string description { get; set; } = "N/A";
    public string category { get; set; } = string.Empty;
    public bool tradable { get; set; } = false;
    public string wikiaUrl { get; set; } = string.Empty;
    public string imageName { get; set; } = string.Empty;
    public IEnumerable<Patchlog> patchlogs { get; set; } = new List<Patchlog>();
    public IEnumerable<DropSource> drops { get; set; } = new List<DropSource>();
    public IEnumerable<Component> components { get; set; } = new List<Component>();
}
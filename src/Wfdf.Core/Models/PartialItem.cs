
namespace Wfdf.Core.Models;

// This class is to be used where an item's full data is not needed (i.e item searches)
public record PartialItem
{
    public string uniqueName { get; init; } = string.Empty;
    public string category { get; init; } = string.Empty;
    public string name { get; init; } = string.Empty;
    public string imageName { get; init; } = string.Empty;

    public static explicit operator PartialItem(Item i) => new PartialItem
    {
        uniqueName = i.uniqueName,
        category = i.category,
        name = i.name,
        imageName = i.imageName
    };
}
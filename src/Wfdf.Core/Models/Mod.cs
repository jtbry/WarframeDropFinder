using Wfdf.Core;

namespace Wfdf.Core.Models;

[ItemCategoryAttribute("Mods")]
public record Mod : Item
{
    public string polarity { get; init; } = string.Empty;
}
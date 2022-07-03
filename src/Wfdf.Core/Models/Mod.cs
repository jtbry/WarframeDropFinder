using Wfdf.Core;

namespace Wfdf.Core.Models;

[ItemCategoryAttribute("Mods")]
public class Mod : Item
{
    public string polarity { get; set; } = string.Empty;
}
using Wfdf.Core;

namespace Wfdf.Core.Models;

[ItemCategoryAttr("Mods")]
public class Mod : Item
{
    public string polarity { get; set; } = string.Empty;   
}
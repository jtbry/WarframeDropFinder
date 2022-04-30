namespace Wfdf.Core.Models;

public class Component
{
    public string uniqueName { get; set; } = string.Empty;
    public string name { get; set; } = string.Empty;
    public string description { get; set; } = "N/A";
    public string imageName { get; set; } = string.Empty;
    public bool tradable { get; set; } = false;
    public int itemCount { get; set; } = 0;
    public IEnumerable<DropSource> drops { get; set; } = new List<DropSource>();
}
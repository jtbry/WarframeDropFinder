namespace Wfdf.Api.Model;

using Wfdf.Core.Models;

public class ComponentWithItems
{
    public Component? component { get; set; }
    public IEnumerable<PartialItem> items { get; set; } = new List<PartialItem>();
}

namespace Wfdf.Api.Model;

using Wfdf.Core.Models;

public record ComponentWithItems
{
    public Component? component { get; init; }
    public IEnumerable<PartialItem>? items { get; init; }
}

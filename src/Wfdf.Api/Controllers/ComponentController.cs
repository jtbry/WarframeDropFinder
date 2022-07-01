using Microsoft.AspNetCore.Mvc;
using Wfdf.Core.Service;
using Wfdf.Core.Models;
using Wfdf.Api.Model;

namespace Wfdf.Api.Controllers;

[Route("api/[controller]")]
[ApiController]
public class ComponentController : ControllerBase
{
    private readonly ItemService _itemService;

    public ComponentController(ILogger<ItemController> logger, ItemService itemService)
    {
        _itemService = itemService;
    }

    [HttpGet]
    [Route("ComponentByUniqueName")]
    public async Task<ComponentWithItems> ComponentByUniqueName(string uniqueName)
    {
        var items = await _itemService.FindItemsWithComponent(uniqueName);
        return new ComponentWithItems
        {
            component = items.First().components.FirstOrDefault(c => c.uniqueName.Equals(uniqueName)),
            items = items.Select(i => (PartialItem)i)
        };
    }
}

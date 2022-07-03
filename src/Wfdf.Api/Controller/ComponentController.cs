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
    private readonly ILogger<ComponentController> _logger;

    public ComponentController(ItemService itemService, ILogger<ComponentController> logger)
    {
        _itemService = itemService;
        _logger = logger;
    }

    [HttpGet]
    public async Task<ActionResult<ComponentWithItems>> ComponentByUniqueName(string uniqueName)
    {
        var items = await _itemService.FindItemsWithComponent(uniqueName);
        if (!items.Any())
        {
            _logger.LogWarning("no items with {uniqueName} component found", uniqueName);
            return NotFound();
        }

        return Ok(new ComponentWithItems
        {
            component = items.First().components.FirstOrDefault(c => c.uniqueName.Equals(uniqueName)),
            items = items.Select(i => (PartialItem)i)
        });
    }
}

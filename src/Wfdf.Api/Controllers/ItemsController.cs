using Microsoft.AspNetCore.Mvc;
using Wfdf.Core.Services;
using Wfdf.Core.Models;

namespace Wfdf.Api.Controllers;

[Route("api/[controller]")]
[ApiController]
public class ItemsController : ControllerBase
{
    private readonly ILogger<ItemsController> _logger;
    private readonly ItemsService _itemsService;

    public ItemsController(ILogger<ItemsController> logger, ItemsService itemsService)
    {
        _logger = logger;
        _itemsService = itemsService;
    }

    [HttpGet]
    [Route("GetRandomItems")]
    public async Task<IEnumerable<PartialItem>> GetRandomItems(int count = 5)
        => await _itemsService.SelectRandomItems(count);

    [HttpGet]
    [Route("GetItemByUniqueName")]
    public async Task<ActionResult<Item>> GetItemByUniqueName(string uniqueName)
    {
        try
        {
            var item = await _itemsService.FindItemByUniqueName(uniqueName);
            return Ok(item);
        }
        catch (InvalidOperationException)
        {

            return NotFound();
        }
    }

    [HttpGet]
    [Route("SearchItemByName")]
    public async Task<IEnumerable<PartialItem>> SearchItemByName(string name)
        => await _itemsService.SearchItemByName(name);
}

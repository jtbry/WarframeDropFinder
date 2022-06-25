using Microsoft.AspNetCore.Mvc;
using Wfdf.Core.Services;
using Wfdf.Core.Models;

namespace Wfdf.Api.Controllers;

[Route("api/[controller]")]
[ApiController]
public class ItemController : ControllerBase
{
    private readonly ILogger<ItemController> _logger;
    private readonly ItemService _itemService;
    private readonly RedisService _redis;

    public ItemController(ILogger<ItemController> logger, ItemService itemService, RedisService redis)
    {
        _logger = logger;
        _itemService = itemService;
        _redis = redis;
    }

    [HttpGet]
    [Route("GetRandomItems")]
    public async Task<IEnumerable<PartialItem>> GetRandomItems(int count = 5)
        => await _itemService.SelectRandomItems(count);

    [HttpGet]
    [Route("GetItemByUniqueName")]
    public async Task<ActionResult<Item>> GetItemByUniqueName(string uniqueName)
    {
        try
        {
            var item = await _itemService.FindItemByUniqueName(uniqueName);
            await _redis.IncrementItemTrend(uniqueName);
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
        => await _itemService.SearchItemByName(name);

    [HttpGet]
    [Route("GetTrendingItems")]
    public async Task<IEnumerable<PartialItem>> GetTrendingItems(int count = 5)
    {
        var trendingItems = await _redis.GetTrendingItems(count);
        var itemList = new List<PartialItem>();
        foreach (var uniqueName in trendingItems)
        {
            var item = await _itemService.FindItemByUniqueName(uniqueName);
            itemList.Add((PartialItem)item);
        }
        return itemList;
    }
}

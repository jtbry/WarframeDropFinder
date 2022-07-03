using Microsoft.AspNetCore.Mvc;
using Wfdf.Api.Service;
using Wfdf.Core.Models;
using Wfdf.Core.Service;

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
    public async Task<ActionResult<Item>> GetByUniqueName(string uniqueName)
    {
        var item = await _itemService.GetItemByUniqueName(uniqueName);
        if (item is null)
        {
            _logger.LogWarning("{uniqueName} item not found", uniqueName);
            return NotFound();
        }

        await _redis.IncrementTrendAsync(uniqueName);
        return Ok(item);
    }

    [HttpGet("Random")]
    public async Task<IEnumerable<PartialItem>> Random(int count = 1)
        => await _itemService.GetRandomItems(count);

    [HttpGet("Search")]
    public async Task<IEnumerable<PartialItem>> SearchByName(string name)
        => await _itemService.SearchItemByName(name);

    [HttpGet("Trending")]
    public async Task<IEnumerable<PartialItem>> TrendingItems(int count = 3)
    {
        var trendingItems = await _redis.GetTrendingItemsAsync(count);
        var itemList = new List<PartialItem>();
        foreach (var uniqueName in trendingItems)
        {
            var item = await _itemService.GetItemByUniqueName(uniqueName);
            itemList.Add((PartialItem)item);
        }
        return itemList;
    }
}

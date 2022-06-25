using Microsoft.AspNetCore.Mvc;
using Wfdf.Core.Services;
using Wfdf.Core.Models;

namespace Wfdf.Api.Controllers;

[Route("api/[controller]")]
[ApiController]
public class StatsController : ControllerBase
{
    private readonly ILogger<ItemController> _logger;
    private readonly StatService _statService;

    public StatsController(ILogger<ItemController> logger, StatService statService)
    {
        _logger = logger;
        _statService = statService;
    }

    [HttpGet]
    [Route("GetWfdfStats")]
    public async Task<WfdfStats> GetWfdfStats()
    {
        return new WfdfStats
        {
            totalItems = await _statService.GetTotalItemCount(),
            tradableItems = await _statService.GetTradableItemCount(),
            totalMods = await _statService.GetItemCountByCategory("Mods"),
            totalRelics = await _statService.GetItemCountByCategory("Relics")
        };
    }
}

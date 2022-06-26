using Microsoft.AspNetCore.Mvc;
using Wfdf.Core.Services;
using Wfdf.Core.Models;

namespace Wfdf.Api.Controllers;

[Route("api/[controller]")]
[ApiController]
public class StatsController : ControllerBase
{
    private readonly StatService _statService;

    public StatsController(StatService statService)
    {
        _statService = statService;
    }

    [HttpGet]
    [Route("WfdfStats")]
    public async Task<WfdfStats> WfdfStats()
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

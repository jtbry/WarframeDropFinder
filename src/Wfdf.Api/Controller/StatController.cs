using Microsoft.AspNetCore.Mvc;
using Wfdf.Core.Models;
using Wfdf.Api.Service;

namespace Wfdf.Api.Controllers;

[Route("api/[controller]")]
[ApiController]
public class StatController : ControllerBase
{
    private readonly StatService _statService;

    public StatController(StatService statService)
    {
        _statService = statService;
    }

    [HttpGet("Wfdf")]
    public async Task<WfdfStats> WfdfStats()
    {
        return new WfdfStats
        {
            totalItems = await _statService.GetItemCountAsync(),
            tradableItems = await _statService.GetTradableCountAsync(),
            totalMods = await _statService.GetCategoryCountAsync("Mods"),
            totalRelics = await _statService.GetCategoryCountAsync("Relics")
        };
    }
}

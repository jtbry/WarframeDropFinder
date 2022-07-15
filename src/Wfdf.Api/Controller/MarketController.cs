using System.Text.Json;
using Microsoft.AspNetCore.Mvc;
using Wfdf.Api.Model;
using Wfdf.Api.Service;

namespace Wfdf.Api.Controllers;

[Route("api/[controller]")]
[ApiController]
public class MarketController : ControllerBase
{
    private readonly MarketService _marketService;
    private readonly ILogger<MarketController> _logger;

    public MarketController(ILogger<MarketController> logger, MarketService marketService)
    {
        _marketService = marketService;
        _logger = logger;
    }

    [HttpGet("Orders")]
    public async Task<ActionResult<IEnumerable<WfmOrder>>> Orders(string wfmName)
    {
        var orders = await _marketService.GetOrdersAsync(wfmName);
        if (!orders.Any())
        {
            return NotFound();
        }
        return Ok(orders);
    }

    [HttpGet("Prices")]
    public async Task<ActionResult<IEnumerable<WfmPriceData>>> PricesForItem(string wfmName)
    {
        var prices = await _marketService.GetPriceDataAsync(wfmName);
        if (!prices.Any())
        {
            return NotFound();
        }
        return Ok(prices);
    }
}

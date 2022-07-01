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

    [HttpGet]
    [Route("OrdersForItem")]
    public async Task<ActionResult<IEnumerable<WfmOrder>>> OrdersForItem(string wfmName)
    {
        try
        {
            var orders = await _marketService.GetOrdersForItem(wfmName);
            return Ok(orders);
        }
        catch (Exception ex)
        {
            _logger.LogError("Error getting orders for item {wfmName}", wfmName);
            return Problem();
        }
    }

    [HttpGet]
    [Route("PricesForItem")]
    public async Task<ActionResult<IEnumerable<WfmPriceData>>> PricesForItem(string wfmName)
    {
        try
        {
            var prices = await _marketService.GetItemPriceData(wfmName);
            return Ok(prices);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error getting prices for item {wfmName}", wfmName);
            return Problem();
        }
    }
}

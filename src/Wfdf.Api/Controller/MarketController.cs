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
        try
        {
            var orders = await _marketService.GetOrdersAsync(wfmName);
            return Ok(orders);
        }
        catch (JsonException ex)
        {
            _logger.LogError("InvalidWfmResponse on Orders for {wfmName}\r\n{message}", wfmName, ex.Message);
            return Problem(ex.Message);
        }
    }

    [HttpGet("Prices")]
    public async Task<ActionResult<IEnumerable<WfmPriceData>>> PricesForItem(string wfmName)
    {
        try
        {
            var prices = await _marketService.GetPriceDataAsync(wfmName);
            return Ok(prices);
        }
        catch (JsonException ex)
        {
            _logger.LogError("InvalidWfmResponse on Prices for {wfmName}\r\n{message}", wfmName, ex.Message);
            return Problem(ex.Message);
        }
    }
}

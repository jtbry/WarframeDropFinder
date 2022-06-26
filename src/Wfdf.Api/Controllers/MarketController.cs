using Microsoft.AspNetCore.Mvc;
using Wfdf.Api.Model;
using Wfdf.Api.Service;

namespace Wfdf.Api.Controllers;

[Route("api/[controller]")]
[ApiController]
public class MarketController : ControllerBase
{
    private readonly MarketService _marketService;

    public MarketController(ILogger<ItemController> logger, MarketService marketService)
    {
        _marketService = marketService;
    }

    [HttpGet]
    [Route("OrdersForItem")]
    public async Task<IEnumerable<WfmOrder>> OrdersForItem(string uniqueName)
        => (await _marketService.GetOrdersForItem(uniqueName)) ?? Enumerable.Empty<WfmOrder>();
}

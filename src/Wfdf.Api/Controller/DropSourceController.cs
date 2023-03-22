using Microsoft.AspNetCore.Mvc;
using Wfdf.Core.Models;
using Wfdf.Core.Service;

namespace Wfdf.Api.Controllers;

[Route("api/[controller]")]
[ApiController]
public class DropSourceController : ControllerBase
{
    private readonly ILogger<DropSourceController> _logger;
    private readonly ItemService _itemService;

    public DropSourceController(ILogger<DropSourceController> logger, ItemService itemService)
    {
        _logger = logger;
        _itemService = itemService;
    }

    [HttpGet]
    public async Task<IEnumerable<PartialItem>> GetByLocationName(string locationName)
    {
        return await _itemService.FindItemsWithDropSourceAsync(locationName);
    }
}

using Microsoft.AspNetCore.Mvc;

namespace Wfdf.Api.Controllers;

public class HomeController : ControllerBase
{
    private readonly IConfiguration _config;

    public HomeController(IConfiguration config)
    {
        _config = config;
    }

    public IActionResult Index()
    {
        return Redirect(_config["ReactAppDomain"]);
    }
}
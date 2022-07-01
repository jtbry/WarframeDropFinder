namespace Wfdf.Core.Service;

public class WfdfHttpClient : HttpClient
{
    public WfdfHttpClient()
    {
        DefaultRequestHeaders.Add("User-Agent", "warframedropfinder/1.0");
    }
}
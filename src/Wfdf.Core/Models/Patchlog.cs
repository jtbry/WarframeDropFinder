namespace Wfdf.Core.Models;

public class Patchlog
{
    public string name { get; set; } = string.Empty;
    public DateTime date { get; set; } = DateTime.MinValue;
    public string url { get; set; } = string.Empty;
    public string additions { get; set; } = string.Empty;
    public string changes { get; set; } = string.Empty;
    public string fixes { get; set; } = string.Empty;
}
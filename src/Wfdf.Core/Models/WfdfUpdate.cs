namespace Wfdf.Core.Models;

public class WfdfUpdate 
{
    public string commitSha { get; set; } = "N/A";
    public Boolean isForced { get; set; } = false;
    public IEnumerable<string> updatedCategories { get; set; } = new List<string>();
    public DateTime timestamp { get; set; } = DateTime.Now;
    public int secondsTaken { get; set; } = 0;
}
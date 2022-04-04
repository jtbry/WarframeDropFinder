namespace Wfdf.Core.Models;

using System.Text.Json.Serialization;
using MongoDB.Bson;

public class File {
    [JsonPropertyName("filename")]
    public string fileName { get; set; } = string.Empty;
    [JsonPropertyName("raw_url")]
    public string rawUrl { get; set; } = string.Empty;
}

public class GithubCommit
{
    public string sha { get; set; } = string.Empty;
    public List<File> files { get; set; } = new List<File>();
}

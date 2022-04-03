namespace Wfdf.Core.Models;
using MongoDB.Bson;

public class GithubCommit
{
    public ObjectId Id { get; set; }
    public string sha { get; set; } = string.Empty;
}

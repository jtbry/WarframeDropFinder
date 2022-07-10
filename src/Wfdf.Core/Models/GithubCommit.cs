namespace Wfdf.Core.Models;

public record GithubCommit
{
    public string sha { get; init; } = string.Empty;
}

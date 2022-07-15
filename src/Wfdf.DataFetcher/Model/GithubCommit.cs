
public record GithubCommit
{
    public string sha { get; init; } = string.Empty;
    public bool isForced { get; set; } = false;

    public string shortSha => sha.Substring(0, 7);
}

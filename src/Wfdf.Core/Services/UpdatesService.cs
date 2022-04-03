using Wfdf.Core.Models;
using MongoDB.Driver;

namespace Wfdf.Core.Services;

public class UpdatesService
{
    private readonly IMongoCollection<GithubCommit> _updates;

    public UpdatesService(IMongoDatabase database)
    {
        _updates = database.GetCollection<GithubCommit>("updates");
    }

    public async Task<GithubCommit> GetCommitBySha(string sha)
        => await _updates.Find(update => update.sha == sha).FirstOrDefaultAsync();

    public async Task AddCommit(GithubCommit commit)
        => await _updates.InsertOneAsync(commit);
}
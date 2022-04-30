using Wfdf.Core.Models;
using MongoDB.Driver;

namespace Wfdf.Core.Services;

public class UpdatesService
{
    private readonly IMongoCollection<WfdfUpdate> _updates;

    public UpdatesService(WfdfDatabase database)
    {
        _updates = database.GetCollection<WfdfUpdate>("updates");
    }

    public async Task<WfdfUpdate> GetUpdateByCommitSha(string sha)
        => await _updates.Find(update => update.commitSha == sha).FirstOrDefaultAsync();

    public async Task AddWfdfUpdate(WfdfUpdate update)
        => await _updates.InsertOneAsync(update);
}
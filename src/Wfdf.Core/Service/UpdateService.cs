using Wfdf.Core.Models;
using MongoDB.Driver;

namespace Wfdf.Core.Service;

public class UpdateService
{
    private readonly IMongoCollection<WfdfUpdate> _updates;

    public UpdateService(WfdfDatabase database)
    {
        _updates = database.GetCollection<WfdfUpdate>("updates");
    }

    public async Task<WfdfUpdate> GetUpdateByShaAsync(string sha)
        => await _updates.Find(update => update.commitSha == sha).FirstOrDefaultAsync();

    public async Task AddUpdateAsync(WfdfUpdate update)
        => await _updates.InsertOneAsync(update);
}
using Microsoft.Extensions.Options;
using MongoDB.Driver;
using Wfdf.Core.Config;

namespace Wfdf.Core;

public class WfdfDatabase
{
    private readonly IMongoClient _client;
    private readonly IMongoDatabase _database;

    public WfdfDatabase(IOptions<MongoDbConfig> config)
    {
        _client = new MongoClient(config.Value.ConnectionString);
        _database = _client.GetDatabase(config.Value.DatabaseName);
    }

    public IMongoCollection<T> GetCollection<T>(string collectionName)
        => _database.GetCollection<T>(collectionName);
}
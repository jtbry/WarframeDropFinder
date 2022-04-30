using MongoDB.Driver;

namespace Wfdf.Core;

public class WfdfDatabase
{
    private readonly IMongoClient _client;
    private readonly IMongoDatabase _database;

    public WfdfDatabase(string connectionString)
    {
        _client = new MongoClient(connectionString);
        _database = _client.GetDatabase("wfdf");
    }

    public IMongoCollection<T> GetCollection<T>(string collectionName)
        => _database.GetCollection<T>(collectionName);
}
using Wfdf.Core.Models;
using MongoDB.Driver;
using MongoDB.Bson;
using Wfdf.Core;

namespace Wfdf.Api.Service;

public class StatService
{
    private readonly IMongoCollection<Item> _items;

    public StatService(WfdfDatabase database)
    {
        _items = database.GetCollection<Item>("items");
    }

    public async Task<long> GetItemCountAsync()
        => await _items.CountDocumentsAsync(new BsonDocument());

    public async Task<long> GetTradableCountAsync()
        => await _items.CountDocumentsAsync(Builders<Item>.Filter.Eq(i => i.tradable, true));

    public async Task<long> GetCategoryCountAsync(string category)
        => await _items.CountDocumentsAsync(Builders<Item>.Filter.Eq(i => i.category, category));
}
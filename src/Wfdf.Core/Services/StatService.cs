using Wfdf.Core.Models;
using MongoDB.Driver;
using MongoDB.Bson;

namespace Wfdf.Core.Services;

public class StatService
{
    private readonly IMongoCollection<Item> _items;

    public StatService(WfdfDatabase database)
    {
        _items = database.GetCollection<Item>("items");
    }

    public async Task<long> GetTotalItemCount()
        => await _items.CountDocumentsAsync(new BsonDocument());

    public async Task<long> GetTradableItemCount()
        => await _items.CountDocumentsAsync(Builders<Item>.Filter.Eq(i => i.tradable, true));

    public async Task<long> GetItemCountByCategory(string category)
        => await _items.CountDocumentsAsync(Builders<Item>.Filter.Eq(i => i.category, category));
}
using MongoDB.Bson;
using MongoDB.Driver;
using Wfdf.Core.Models;

namespace Wfdf.Core.Services;

public class ItemsService
{
    private readonly IMongoCollection<Item> _items;

    public ItemsService(IMongoDatabase database)
    {
        _items = database.GetCollection<Item>("items");
    }

    public async Task UpsertManyItems(List<Item> items)
    {
        var updates = new List<WriteModel<Item>>();
        foreach (var item in items)
        {
            var upsertOne = new ReplaceOneModel<Item>(
                Builders<Item>.Filter.Eq(s => s.uniqueName, item.uniqueName),
                item
            ) { IsUpsert = true };
            updates.Add(upsertOne);
        }
        await _items.BulkWriteAsync(updates);
    }

}
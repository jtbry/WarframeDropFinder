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

    private ReplaceOneModel<Item> CreateItemUpsertModel(Item item)
    {
        return new ReplaceOneModel<Item>(
                Builders<Item>.Filter.Eq(s => s.uniqueName, item.uniqueName),
                item
            )
        { IsUpsert = true };
    }

    public async Task UpsertManyItems(List<Item> items)
    {
        var updates = new List<WriteModel<Item>>();
        foreach (var item in items)
        {
            // TODO: clean up item here, try to fill empty fields
            // seperate components, etc
            updates.Add(CreateItemUpsertModel(item));
        }
        await _items.BulkWriteAsync(updates);
    }

}
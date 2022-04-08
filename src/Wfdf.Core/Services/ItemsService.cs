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
        _items.Indexes.CreateOne(new CreateIndexModel<Item>(Builders<Item>.IndexKeys.Ascending("uniqueName")));
    }

    private ReplaceOneModel<Item> CreateItemUpsertModel(Item item)
    {
        return new ReplaceOneModel<Item>(
                Builders<Item>.Filter.Eq(s => s.uniqueName, item.uniqueName),
                item
            )
        { IsUpsert = true };
    }

    public async Task<BulkWriteResult> UpsertManyItems(List<Item> items)
    {
        var updates = new List<WriteModel<Item>>();
        foreach (var item in items)
        {
            updates.Add(CreateItemUpsertModel(item));
        }
        return await _items.BulkWriteAsync(updates);
    }

}
using MongoDB.Bson;
using MongoDB.Driver;
using MongoDB.Driver.Linq;
using Wfdf.Core.Models;

namespace Wfdf.Core.Services;

public class ItemsService
{
    private readonly IMongoCollection<Item> _items;

    public ItemsService(WfdfDatabase database)
    {
        _items = database.GetCollection<Item>("items");
        _items.Indexes.CreateOne(
            new CreateIndexModel<Item>(
                Builders<Item>.IndexKeys.Ascending(item => item.uniqueName),
                new CreateIndexOptions { Unique = true }
            )
        );
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

    public async Task<IEnumerable<PartialItem>> SearchItemByName(string name)
    {
        // TODO: some sort of fuzzy search
        var filter = Builders<Item>.Filter.Regex("name", new BsonRegularExpression(name, "i"));
        var matches = await _items.Find(filter).ToListAsync();
        return matches.Select(i => (PartialItem)i);
    }

    public async Task<Item> FindItemByUniqueName(string uniqueName)
        => await _items.Find(i => i.uniqueName == uniqueName).FirstAsync();

    public async Task<IEnumerable<PartialItem>> SelectRandomItems(int count)
    {
        // These are the most abundant and least interesting so we blacklist them
        var categoryBlacklist = new List<string> { "Mods", "Arcanes", "Relics" };
        var items = await _items.AsQueryable()
            .Where(i => !categoryBlacklist.Contains(i.category))
            .Sample(count)
            .ToListAsync();
        return items.Select(i => (PartialItem)i);
    }
}
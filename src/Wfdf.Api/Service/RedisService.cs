using Microsoft.Extensions.Options;
using StackExchange.Redis;
using Wfdf.Core.Config;

namespace Wfdf.Api.Service;

public class RedisService
{
    private readonly IConnectionMultiplexer _connection;
    private readonly IDatabase _database;

    public RedisService(IOptions<RedisConfig> config)
    {
        _connection = ConnectionMultiplexer.Connect(config.Value.ConnectionString);
        _database = _connection.GetDatabase();
    }

    public async Task IncrementTrendAsync(string uniqueName)
    {
        var existingKey = await _database.SortedSetScoreAsync("trend", uniqueName);
        if (existingKey is null)
        {
            await _database.SortedSetAddAsync("trend", uniqueName, DateTimeOffset.UtcNow.AddMinutes(10).ToUnixTimeMilliseconds());
        }
        else
        {
            await _database.SortedSetIncrementAsync("trend", uniqueName, TimeSpan.FromMinutes(5).TotalMilliseconds);
        }
    }

    public async Task<IEnumerable<string>> GetTrendingItemsAsync(int count)
    {
        await _database.SortedSetRemoveRangeByScoreAsync("trend", 0, DateTimeOffset.Now.ToUnixTimeMilliseconds());

        var trendingItems = await _database.SortedSetRangeByRankAsync("trend", 0, count - 1, Order.Descending);
        return trendingItems.Select(x => x.ToString());
    }
}
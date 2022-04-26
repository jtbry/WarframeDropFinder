using StackExchange.Redis;

namespace Wfdf.Core.Services;

public class RedisService
{
    private readonly IConnectionMultiplexer _connection;

    public RedisService(string connectionString)
    {
        _connection = ConnectionMultiplexer.Connect(connectionString, (options =>
        {
            options.ConnectTimeout = 10000;
        }));
    }

    public async Task IncrementItemTrend(string uniqueName)
    {
        // TODO: increment time by 10 minutes rather than setting it to now + 10
        var db = _connection.GetDatabase();
        await db.SortedSetAddAsync("trend", uniqueName, DateTimeOffset.UtcNow.AddMinutes(10).ToUnixTimeMilliseconds());
    }

    public async Task<IEnumerable<string>> GetTrendingItems(int count)
    {
        var db = _connection.GetDatabase();

        // TODO: determine if there's a better way to handle this i.e sorted set expire by score
        await db.SortedSetRemoveRangeByScoreAsync("trend", 0, DateTimeOffset.Now.ToUnixTimeMilliseconds());

        var trendingItems = await db.SortedSetRangeByRankAsync("trend", 0, count - 1, Order.Descending);
        return trendingItems.Select(x => x.ToString());
    }
}
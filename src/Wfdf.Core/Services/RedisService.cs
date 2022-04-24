using StackExchange.Redis;

namespace Wfdf.Core.Services;

public class RedisService
{
    private readonly IConnectionMultiplexer _connection;

    public RedisService(string connectionString)
    {
        _connection = ConnectionMultiplexer.Connect(connectionString);
    }

    public async Task IncrementItemTrend(string uniqueName)
    {
        var db = _connection.GetDatabase();
        var score = await db.SortedSetScoreAsync("trend", uniqueName);
        if (score.HasValue)
        {
            // Increment
            var currentScore = DateTimeOffset.FromUnixTimeMilliseconds((int)score.Value);
            var newScore = currentScore.AddMinutes(10);
            await db.SortedSetIncrementAsync("trend", uniqueName, newScore.ToUnixTimeMilliseconds());
        }
        else
        {
            // Add new
            await db.SortedSetAddAsync("trend", uniqueName, DateTimeOffset.Now.AddMinutes(10).ToUnixTimeMilliseconds());
        }
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
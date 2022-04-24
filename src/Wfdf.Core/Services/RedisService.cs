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
            var newScore = currentScore.Add(TimeSpan.FromMinutes(10));
            await db.SortedSetIncrementAsync("trend", uniqueName, newScore.ToUnixTimeMilliseconds());
        }
        else
        {
            await db.SortedSetAddAsync("trend", uniqueName, DateTimeOffset.Now.ToUnixTimeMilliseconds());
        }
    }

    public async Task<IEnumerable<string>> GetTrendingItems(int count)
    {
        // TODO: remove those from trending that have a score older than current timestamp
        var db = _connection.GetDatabase();
        var trendingItems = await db.SortedSetRangeByRankAsync("trend", 0, count - 1, Order.Ascending);
        return trendingItems.Select(x => x.ToString());
    }
}
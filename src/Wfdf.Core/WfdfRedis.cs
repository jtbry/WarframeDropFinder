using StackExchange.Redis;

namespace Wfdf.Core;

public class WfdfRedis
{
    private readonly IConnectionMultiplexer _connection;

    public WfdfRedis(string connectionString)
    {
        _connection = ConnectionMultiplexer.Connect(connectionString);
    }

    public IDatabase GetDatabase()
        => _connection.GetDatabase();
}
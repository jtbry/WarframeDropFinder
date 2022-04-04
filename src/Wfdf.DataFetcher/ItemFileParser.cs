using Wfdf.Core.Models;
using System.Text.Json;

public class ItemFileParser
{
    private string _fileRawUrl;
    private HttpClient _client;
    public ItemFileParser(string fileRawUrl, HttpClient client)
    {
        _fileRawUrl = fileRawUrl;
        _client = client;
    }

    public async Task<List<Item>> Parse()
    {
        var response = await _client.GetAsync(_fileRawUrl);
        response.EnsureSuccessStatusCode();
        var responseString = await response.Content.ReadAsStringAsync();
        var items = JsonSerializer.Deserialize<List<Item>>(responseString) ?? new List<Item>();
        return items;
    }
}
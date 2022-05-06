
using System.Text.Json;

public class TranslationFileParser
{
    private string _commitSha;
    private HttpClient _client;

    public TranslationFileParser(string commitSha, HttpClient client)
    {
        _commitSha = commitSha;
        _client = client;
    }

    public async Task Parse()
    {
        var response = await _client.GetAsync($"https://raw.githubusercontent.com/WFCD/warframe-items/{_commitSha}/data/json/i18n.json");
        response.EnsureSuccessStatusCode();
        var jsonString = await response.Content.ReadAsStringAsync();

        JsonDocument document = JsonDocument.Parse(jsonString);
        var root = document.RootElement;

        foreach (JsonProperty property in root.EnumerateObject())
        {
            var value = property.Value;
            System.Console.WriteLine("Hello");
        }
    }
}
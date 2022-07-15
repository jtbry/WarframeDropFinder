using Wfdf.Core;
using Wfdf.Core.Models;
using System.Text.Json;
using System.Text.Json.Serialization;
using System.Reflection;

public class ItemJsonConverter : JsonConverter<Item>
{
    private IEnumerable<Type> _types;

    public ItemJsonConverter()
    {
        _types = Assembly.GetAssembly(typeof(Item))!.GetTypes().Where(t => t.IsSubclassOf(typeof(Item)));
    }

    public override Item Read(ref Utf8JsonReader reader, Type typeToConvert, JsonSerializerOptions options)
    {
        if (JsonDocument.TryParseValue(ref reader, out var document))
        {
            if (document.RootElement.TryGetProperty("category", out var itemCategory))
            {
                string category = itemCategory.GetString() ?? string.Empty;
                Type? itemType = _types.FirstOrDefault(t => t.GetCustomAttribute<ItemCategoryAttribute>()!.Category == category);
                if (itemType is null)
                {
                    return JsonSerializer.Deserialize<Item>(document) ?? throw new JsonException("Unable to desrialize item document");
                }
                else
                {
                    return (Item)(JsonSerializer.Deserialize(document, itemType) ?? throw new JsonException($"Unable to {itemType.Name} document"));
                }
            }
            throw new JsonException("Item missing category");
        }
        throw new JsonException("Failed to parse JsonDocument");
    }

    public override void Write(Utf8JsonWriter writer, Item value, JsonSerializerOptions options)
    {
        JsonSerializer.Serialize(writer, value, options);
    }
}
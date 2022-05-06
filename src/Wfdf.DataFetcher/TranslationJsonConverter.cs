using Wfdf.Core;
using Wfdf.Core.Models;
using System.Text.Json;
using System.Text.Json.Serialization;
using System.Reflection;

public class TranslationJsonConverter : JsonConverter<dynamic>
{

    public TranslationJsonConverter() { }

    public override dynamic Read(ref Utf8JsonReader reader, Type typeToConvert, JsonSerializerOptions options)
    {
        throw new System.NotImplementedException();
    }

    public override void Write(Utf8JsonWriter writer, dynamic value, JsonSerializerOptions options)
    {
        JsonSerializer.Serialize(writer, value, options);
    }
}
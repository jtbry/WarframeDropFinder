using System.Text.Json;

namespace Wfdf.Api;

[System.Serializable]
public class InvalidWfmResponseException : JsonException
{
    public InvalidWfmResponseException() { }
    public InvalidWfmResponseException(string message) : base(message) { }
    public InvalidWfmResponseException(string message, System.Exception inner) : base(message, inner) { }
    protected InvalidWfmResponseException(
        System.Runtime.Serialization.SerializationInfo info,
        System.Runtime.Serialization.StreamingContext context) : base(info, context) { }
}
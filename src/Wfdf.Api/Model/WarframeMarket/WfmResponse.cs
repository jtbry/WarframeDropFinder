namespace Wfdf.Api.Model;

public record WfmResponse<TPayload>
{
    public TPayload? Payload { get; init; }
    public string? Error { get; init; }

    public bool HasError => !string.IsNullOrEmpty(Error);
}
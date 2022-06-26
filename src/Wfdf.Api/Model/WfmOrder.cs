using System.Text.Json.Serialization;

namespace Wfdf.Api.Model;

public class WfmOrder
{
    [JsonPropertyName("creation_date")]
    public DateTime CreationDate { get; set; }
    public int Quantity { get; set; }
    public int Platinum { get; set; }
}
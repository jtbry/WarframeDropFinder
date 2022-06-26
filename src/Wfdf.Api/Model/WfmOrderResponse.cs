namespace Wfdf.Api.Model;

public class WfmOrderResponse
{
    public class Payload
    {
        public IEnumerable<WfmOrder>? orders { get; set; }
    }

    public Payload? payload { get; set; }
}
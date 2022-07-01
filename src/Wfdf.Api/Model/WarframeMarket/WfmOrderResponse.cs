namespace Wfdf.Api.Model;

public class WfmOrderResponse
{
    public class WfmOrderPayload
    {
        public IEnumerable<WfmOrder>? orders { get; set; }
    }

    public WfmOrderPayload? payload { get; set; }
}
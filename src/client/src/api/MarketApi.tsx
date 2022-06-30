import axios, { AxiosResponse } from 'axios';
import WfmOrder from '../models/WfmOrder';

namespace MarketApi {
  /**
   * Make a get request to an endpoint in the MarketController
   * @param endpoint The endpoint to query
   * @param params Request params
   * @returns The pending request
   */
  async function get(endpoint: string, params: any): Promise<AxiosResponse> {
    return axios.get(`/api/Market/${endpoint}`, { params });
  }

  /**
   * Get a component and it's associated items by uniqueName
   * @returns An object holding a component and the items it belongs to
   */
  export async function GetOrdersForItem(wfmName: string): Promise<WfmOrder[]> {
    var response = await get('OrdersForItem', {
      wfmName: wfmName,
    });
    return response.data;
  }
}

export default MarketApi;

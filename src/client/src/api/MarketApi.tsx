import axios, { AxiosResponse } from 'axios';
import WfmOrder from '../models/WfmOrder';
import WfmPriceData from '../models/WfmPriceData';

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
   * Get orders for an item given it's warframe market compatible name
   * @returns An array of WfmOrder objects
   */
  export async function GetOrdersForItem(wfmName: string): Promise<WfmOrder[]> {
    var response = await get('Orders', {
      wfmName: wfmName,
    });
    return response.data;
  }

  /**
   * Get recent price data for an item given it's warframe market compatible name
   * @returns The two most recent data points for buy and sell as WfmPriceData objects
   */
  export async function GetPricesForItem(
    wfmName: string
  ): Promise<WfmPriceData[]> {
    var response = await get('Prices', {
      wfmName: wfmName,
    });
    return response.data;
  }
}

export default MarketApi;

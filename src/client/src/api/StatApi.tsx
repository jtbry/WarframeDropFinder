import axios, { AxiosResponse } from 'axios';
import WfdfStats from '../models/WfdfStats';

namespace StatApi {
  /**
   * Make a get request to an endpoint in the StatsApi
   * @param endpoint The endpoint to query
   * @param params Request params
   * @returns The pending request
   */
  async function get(endpoint: string, params: any): Promise<AxiosResponse> {
    return axios.get(`/api/Stats/${endpoint}`, { params });
  }

  /**
   * Get a stat overview of wfdf
   * @returns An object with stats about wfdf
   */
  export async function GetWfdfStats(): Promise<WfdfStats> {
    var response = await get('WfdfStats', {});
    return response.data;
  }
}

export default StatApi;

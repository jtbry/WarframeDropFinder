import axios, { AxiosResponse } from 'axios';
import ComponentWithItems from '../models/ComponentWithItems';

namespace ComponentApi {
  /**
   * Make a get request to an endpoint in the ComponentController
   * @param endpoint The endpoint to query
   * @param params Request params
   * @returns The pending request
   */
  async function get(endpoint: string, params: any): Promise<AxiosResponse> {
    return axios.get(`/api/Component/${endpoint}`, { params });
  }

  /**
   * Get a component and it's associated items by uniqueName
   * @returns An object holding a component and the items it belongs to
   */
  export async function GetComponentByUniqueName(
    uniqueName: string
  ): Promise<ComponentWithItems> {
    var response = await get('', {
      uniqueName: uniqueName,
    });
    return response.data;
  }
}

export default ComponentApi;

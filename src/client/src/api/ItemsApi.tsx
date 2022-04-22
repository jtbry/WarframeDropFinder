import axios, { AxiosResponse } from 'axios';
import Item from '../models/Item';
import PartialItem from '../models/PartialItem';
import { levenshteinDist } from './Utilities';

namespace ItemsApi {
  /**
   * Make a get request to an endpoint in the ItemsApi
   * @param endpoint The endpoint to query
   * @param params Request params
   * @returns The pending request
   */
  async function get(endpoint: string, params: any): Promise<AxiosResponse> {
    return axios.get(`/api/Items/${endpoint}`, { params });
  }

  /**
   * Get a specified number of random PartialItems
   * @param count The number of items to return
   * @returns A list of random PartialItems
   */
  export async function GetRandomItems(count?: number): Promise<PartialItem[]> {
    var response = await get('GetRandomItems', { count: count });
    return response.data;
  }

  /**
   * Search for an item by name, case-insensitive
   * @param name The name of the item to search for
   * @returns PartialItems matching name or empty list if none found
   */
  export async function SearchItemByName(name: string): Promise<PartialItem[]> {
    var response = await get('SearchItemByName', { name: name });

    // Sort by levenshtein distance
    const results = response.data;
    results.sort(
      (a: PartialItem, b: PartialItem) =>
        levenshteinDist(a.name, name) - levenshteinDist(b.name, name)
    );

    // Trim results
    if (results.length > 6) {
      results.splice(6, results.length - 6);
    }
    return results;
  }

  export async function GetItemByUniqueName(uniqueName: string): Promise<Item> {
    var response = await get('GetItemByUniqueName', { uniqueName: uniqueName });
    return response.data;
  }
}

export default ItemsApi;

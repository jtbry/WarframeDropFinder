import axios, { AxiosResponse } from 'axios';
import Item from '../models/Item';
import PartialItem from '../models/PartialItem';
import { levenshteinDist } from './Utilities';

namespace ItemApi {
  /**
   * Make a get request to an endpoint in the ItemsApi
   * @param endpoint The endpoint to query
   * @param params Request params
   * @returns The pending request
   */
  async function get(endpoint: string, params: any): Promise<AxiosResponse> {
    return axios.get(`/api/Item/${endpoint}`, { params });
  }

  /**
   * Get an item by its uniqueName
   * @param uniqueName The unique name of the item to search for
   * @returns Item matching uniqueName or throws error if not found
   */
  export async function GetItemByUniqueName(uniqueName: string): Promise<Item> {
    var response = await get('', { uniqueName: uniqueName });
    return response.data;
  }

  /**
   * Get a specified number of random PartialItems
   * @param count The number of items to return
   * @returns A list of random PartialItems
   */
  export async function GetRandomItems(count?: number): Promise<PartialItem[]> {
    var response = await get('Random', { count: count });
    return response.data;
  }

  /**
   * Search for an item by name, case-insensitive
   * @param name The name of the item to search for
   * @returns PartialItems matching name or empty list if none found
   */
  export async function SearchItemByName(name: string): Promise<PartialItem[]> {
    var response = await get('Search', { name: name });

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

  /**
   * Get a list of trending items
   * @param count The max trending item rank to return
   * @param canFillWithRandom If true, will fill the list with random items if there are not enough trending items
   * @returns A list of trending items
   */
  export async function GetTrendingItems(
    count: number = 4,
    canFillWithRandom?: boolean
  ): Promise<PartialItem[]> {
    var response = await get('Trending', { count: count });
    if (canFillWithRandom && response.data.length < count) {
      const randomItems = await GetRandomItems(count - response.data.length);
      response.data.push(...randomItems);
    }
    return response.data;
  }
}

export default ItemApi;

import axios, { AxiosResponse } from 'axios';
import PartialItem from '../models/PartialItem';
import { levenshteinDist } from './Utilities';

namespace ItemsApi {
  async function get(endpoint: string, params: any): Promise<AxiosResponse> {
    return axios.get(`/api/Items/${endpoint}`, { params });
  }

  export async function GetRandomItems(count?: number): Promise<PartialItem[]> {
    var response = await get('GetRandomItems', { count: count });
    return response.data;
  }

  export async function SearchItemByName(name: string): Promise<PartialItem[]> {
    // Don't search for empty values
    if (name === '') {
      return [];
    }
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
}

export default ItemsApi;

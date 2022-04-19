import axios, { AxiosResponse } from "axios";
import PartialItem from "../models/PartialItem";

namespace ItemsApi {
    async function get(endpoint: string, params: any): Promise<AxiosResponse> {
        return axios.get(`/api/Items/${endpoint}`, { params });
    }

    export async function GetRandomItems(count? : number) : Promise<PartialItem[]> {
        var response = await get("GetRandomItems", { count: count });
        return response.data;
    }

    export async function SearchItemByName(name: string) : Promise<PartialItem[]> {
        // Don't search for empty values
        if (name === "") {
            return [];
        }
        var response = await get("SearchItemByName", { name: name });
        return response.data;
    }
}

export default ItemsApi;
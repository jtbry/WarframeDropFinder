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
}

export default ItemsApi;
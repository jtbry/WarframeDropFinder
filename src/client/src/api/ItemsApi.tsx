import axios from "axios";
import PartialItem from "../models/PartialItem";

namespace ItemsApi {
    export async function GetRandomItems(count? : number) : Promise<PartialItem[]> {
        var response = await axios.get("/api/Items/GetRandomItems", { params: { count: count } });
        return response.data;
    }
}

export default ItemsApi;
import axios from "axios";
import { BaseApi } from "../base-api";
import type { IGetLastMonthStocks } from "./stocks.types";
import type { ICandle } from "../../../domain";

export class StocksApi extends BaseApi {
    static getLastMonth(data: IGetLastMonthStocks): Promise<ICandle[] | undefined> {
        return this.request<ICandle[]>(async (): Promise<ICandle[]> => {
           const result = await axios({
               url: `${this.serverUrl}/api/v1/stocks/${data.ticker}`,
               method: "GET",
           });
           return result.data;
        });
    }
}

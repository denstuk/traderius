import axios from "axios";
import { BaseApi } from "../base-api";
import type { GetAnalysisData } from "./analysis.types";
import type { IAnalysis } from "../../../domain";

export class AnalysisApi extends BaseApi {
    static async analyse(data: GetAnalysisData): Promise<IAnalysis | undefined> {
        return this.request(async () => {
           const response = await axios({
               url: `${this.serverUrl}/api/v1/analysis/${data.ticker}`,
               method: "GET",
               headers: { authorization: this.getToken() },
           });
           return response.data as IAnalysis;
        });
    }
}

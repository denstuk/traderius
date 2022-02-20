import axios from "axios";
import { BaseApi } from "../base-api";

export class UsersApi extends BaseApi {
    static async updateNotificationEnabled(data: { notificationsEnabled: boolean }): Promise<void> {
        return this.request(async () => {
           await axios({
               url: `${this.serverUrl}/api/v1/users/me/notifications`,
               method: "PATCH",
               headers: {
                   authorization: this.getToken()
               },
               data,
           });
        });
    }

    static async updateTinkoffMarketToken(data: { tinkoffMarketToken: string }): Promise<void> {
        return this.request(async () => {
           await axios({
               url: `${this.serverUrl}/api/v1/users/me/tinkoff-market-token`,
               method: "PATCH",
               headers: {
                   authorization: this.getToken()
               },
               data,
           });
        });
    }

    static async updateAutomatedTradingEnabled(data: { automatedTradingEnabled: boolean }): Promise<void> {
        return this.request(async () => {
           await axios({
               url: `${this.serverUrl}/api/v1/users/me/automated-trading`,
               method: "PATCH",
               headers: {
                   authorization: this.getToken()
               },
               data,
           });
        });
    }
}

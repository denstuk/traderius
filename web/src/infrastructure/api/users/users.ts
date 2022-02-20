import axios from "axios";
import { BaseApi } from "../base-api";
import {Currencies, IUser} from "../../../domain";
import {UpdateUserData} from "./users.type";

export class UsersApi extends BaseApi {
    static async updateNotificationEnabled(data: { notificationEnabled: boolean }): Promise<void> {
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

    static async getBalance(): Promise<Currencies | undefined> {
        return this.request<Currencies>(async () => {
           const response = await axios({
               url: `${this.serverUrl}/api/v1/users/me/balance`,
               method: "GET",
               headers: { authorization: this.getToken() }
           });
           return response.data as Currencies;
        });
    }

    static async update(data: UpdateUserData): Promise<IUser | undefined> {
        return this.request(async () => {
            const response = await axios({
                url: `${this.serverUrl}/api/v1/users/me`,
                method: "PUT",
                headers: { authorization: this.getToken() },
                data
            });
            return response.data as IUser;
        });
    }
}

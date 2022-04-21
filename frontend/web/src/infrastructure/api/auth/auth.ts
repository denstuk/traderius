import axios from "axios";
import { BaseApi } from "../base-api";
import type { IUser } from "../../../domain";
import type { ISignInData, ISignUpData } from "./auth.types";

export class AuthApi extends BaseApi {
    static async signUp(data: ISignUpData): Promise<string | undefined> {
        return this.request<string>(async () => {
            const result = await axios({
                url: `${this.serverUrl}/api/v1/auth/sign-up`,
                method: "POST",
                data
            });
            return result.data as string;
        });
    }

    static async signIn(data: ISignInData): Promise<string | undefined> {
        return this.request<string>(async () => {
            const result = await axios({
                url: `${this.serverUrl}/api/v1/auth/sign-in`,
                method: "POST",
                data
            });
            return result.data as string;
        });
    }

    static async me(): Promise<IUser | undefined> {
        return this.request<IUser>(async () => {
            const result = await axios({
                url: `${this.serverUrl}/api/v1/auth/me`,
                method: "GET",
                headers: { authorization: this.getToken() }
            });
            return result.data as IUser;
        });
    }
}

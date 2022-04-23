import { toast } from "react-toastify";
import {LocalStorage} from "../../domain";
import {StorageKeys} from "../../domain/constants";

export abstract class BaseApi {
    protected static serverUrl: string = "http://localhost:9801";

    protected static async request<T>(func: () => Promise<T>): Promise<T | undefined> {
        try {
            return await func();
        } catch (err: any) {
            this.intercept(err);
            return undefined;
        }
    }

    protected static getToken(): string {
        const token = LocalStorage.get(StorageKeys.JwtToken);
        if (!token) {
            throw new Error("Cannot get jwt token");
        }
        return `Bearer ${token}`;
    }

    protected static intercept(error: Error): void {
        toast(error.message, {
            type: "error",
            position: "bottom-right",
            theme: "dark",
        });
    }
}

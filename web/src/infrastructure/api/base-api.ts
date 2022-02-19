import { toast } from "react-toastify";

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

    protected static intercept(error: Error): void {
        toast(error.message, {
            type: "error",
            position: "bottom-right",
            theme: "dark",
        });
    }
}

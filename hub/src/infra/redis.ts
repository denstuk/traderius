import { injectable } from "inversify";
import Keyv from "keyv";

@injectable()
export class Redis {
    private static client: Keyv;

    static async connect(): Promise<void> {
        Redis.client = new Keyv(`redis://localhost:6379`);
    }

    async set(key: string, value: Record<string, unknown>, ttl?: number): Promise<void> {
        const str = JSON.stringify(value);
        await Redis.client.set(key, str, ttl);
    }

    async getObject<T>(key: string): Promise<T | undefined> {
        const value = await Redis.client.get(key);
        return value ? JSON.parse(value) as T : undefined;
    }
}

import { injectable } from "inversify";
import Keyv from "keyv";
import {Configuration} from "./configuration";

@injectable()
export class Redis {
	private static client: Keyv;

	static async connect(): Promise<void> {
		const host = Configuration.get<string>("RedisHost");
		const port = Configuration.get<number>("RedisPort");
		Redis.client = new Keyv(`redis://${host}:${port}`);
	}

	async set(key: string, value: Record<string, unknown>, ttl?: number): Promise<void> {
		const str = JSON.stringify(value);
		await Redis.client.set(key, str, ttl);
	}

	async getObject<T>(key: string): Promise<T | undefined> {
		const value = await Redis.client.get(key);
		return value ? (JSON.parse(value) as T) : undefined;
	}
}

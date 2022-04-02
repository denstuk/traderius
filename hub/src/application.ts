import { injectable } from "inversify";
import { HttpServer } from "./app/http/server";
import { Database, Logger, Redis } from "./infra";

@injectable()
export class Application {
	async up(): Promise<void> {
		Logger.info("Application started");
		try {
			await Database.connect();
			await Redis.connect();
			await HttpServer.up();
		} catch (err: unknown) {
			if (err instanceof Error) {
				Logger.error(err.message);
			}
			await this.down();
		}
	}

	async down(): Promise<void> {
		await HttpServer.down();
		await Database.disconnect();
		Logger.info("Application closed");
	}
}

import { HttpServer } from "./app/http/server";
import { Logger, Database, Redis } from "./infra";

export class Application {
	static async up(): Promise<void> {
		Logger.info("Application started");
		await Database.connect();
		await Redis.connect();
		await HttpServer.up();
	}

	static async down(): Promise<void> {
		await HttpServer.down();
		await Database.disconnect();
		Logger.info("Application closed");
	}
}

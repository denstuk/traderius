import { Bot } from "./infra/telegram/Bot";
import "./app/events";
import { Database } from "./infra/db/Database";
import { Logger } from "./infra/logger";
import { HttpServer } from "./app/http/server";

export class Application {
	static async up(): Promise<void> {
		Logger.info("Application started");
		await Database.connect();
		await Bot.start();
		await HttpServer.up();
	}

	static async down(): Promise<void> {
		await Bot.stop();
		Logger.info("Application shutdowned");
	}
}

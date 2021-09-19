import { Bot } from "./infra/telegram/Bot"
import "./app/events"
import { Database } from "./infra/db/Database"
import { Logger } from "./infra/logger"

export class Application {
	static async start(): Promise<void> {
		Logger.info("Application started")
		await Database.connect()
		await Bot.start()
	}

	static stop(): Promise<void> {
		return Bot.stop()
	}
}

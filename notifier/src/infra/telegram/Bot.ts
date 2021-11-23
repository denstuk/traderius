import TelegramBot from "node-telegram-bot-api";
import { Config } from "../config";
import { Logger } from "../logger";
import { StartHandler } from "./handlers/StartHandler";

export class Bot {
	static connection: TelegramBot

	static start(): void {
		Bot.connection = new TelegramBot(Config.get("TELEGRAM_TOKEN"), { polling: true });
		StartHandler.register(Bot.connection);
		Logger.info("TelegramBot connected");
	}

	static stop(): Promise<void> {
		return Bot.connection.stopPolling();
	}
}

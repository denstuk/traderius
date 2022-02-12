import TelegramBot from "node-telegram-bot-api";
import { Logger } from "../logger";
import { StartHandler } from "./handlers/StartHandler";
import {Configuration} from "../configuration";

export class Bot {
	static connection: TelegramBot

	static start(): void {
		Bot.connection = new TelegramBot(Configuration.get("TelegramToken"), { polling: true });
		StartHandler.register(Bot.connection);
		Logger.info("TelegramBot connected");
	}

	static stop(): Promise<void> {
		return Bot.connection.stopPolling();
	}
}

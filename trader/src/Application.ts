import "./app/mq";
import {Logger} from "./infra/framework";

export class Application {
	static async up(): Promise<void> {
		Logger.info("Application started")
	}

	static async down(): Promise<void> {
		Logger.info("Application started")
	}
}

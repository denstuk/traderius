import { injectable } from "inversify";
import { HttpServer } from "./app/http/server";
import { Database, Logger, Redis } from "./infra";
import { ioc } from "./ioc";
import { SchedulersMaster } from "./app/schedulers/schedulers-master";

@injectable()
export class Application {
	private readonly logger = ioc.resolve(Logger);

	async up(): Promise<void> {
		this.logger.info("Application started");

		try {
			await Database.connect();
			await Redis.connect();
			await ioc.resolve(HttpServer).start();
			await ioc.resolve(SchedulersMaster).start();
		} catch (err: unknown) {
			if (err instanceof Error) {
				this.logger.fatal(err.message);
			}
			await this.down();
		}
	}

	async down(): Promise<void> {
		await Database.disconnect();
		this.logger.info("Application closed");
	}
}

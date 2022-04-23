import { injectable } from "inversify";
import { HttpServer } from "./app/http/server";
import { Configuration, Database, Logger, Redis } from "./infra";
import { ioc } from "./ioc";
import { SchedulersMaster } from "./app/schedulers/schedulers-master";
import { TinkoffV1Rest } from "./infra/markets/tinkoff-v1-rest";
import { KafkaClientService } from "./infra/kafka/kafka-client.service";

@injectable()
export class Application {
	private readonly logger = ioc.resolve(Logger);

	async up(): Promise<void> {
		this.logger.info("Application started");

		try {
			await Database.connect();
			await Redis.connect();
			await ioc.resolve(KafkaClientService).connect();
			await ioc.resolve(HttpServer).start();
			await ioc.resolve(SchedulersMaster).start();

			/*const market = new TinkoffV1Rest(Configuration.get("TinkoffSharedToken"));
			const data = await market.getBalance();
			const shares = await market.shares();*/
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

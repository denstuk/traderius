import { injectable } from "inversify";
import { HttpServer } from "./app/http/server";
import { Configuration, Database, Logger, Redis } from "./infra";
import { ioc } from "./ioc";
import { SchedulersMaster } from "./app/schedulers/schedulers-master";
import { KafkaClientService } from "./infra/kafka/kafka-client.service";
import { TinkoffV1Client } from "./infra/markets";

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

			const tinkoffClient = new TinkoffV1Client(Configuration.get("TinkoffSharedToken"));
			const account = await tinkoffClient.getAccessibleAccount();
			await tinkoffClient.getAccessibleAccountBalance();
			await tinkoffClient.getOrders({ accountId: account!.id });
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

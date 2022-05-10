import { ConfigService } from "@nestjs/config";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./modules/app.module";
import { Logger } from "@nestjs/common";
import { Transport } from "@nestjs/microservices";
import { DocumentationBuilder } from "./modules/documentation";

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	const config = app.get(ConfigService);
	const logger = new Logger("Application");

	DocumentationBuilder(app, config, logger);

	app.setGlobalPrefix(config.get("HTTP_PREFIX"));
	app.connectMicroservice({
		transport: Transport.KAFKA,
		options: {
			client: {
				brokers: [config.get("KAFKA_URI")],
			},
			consumer: {
				groupId: config.get("KAFKA_GROUP_ID"),
				allowAutoTopicCreation: true,
			},
		},
	});
	await app.startAllMicroservices();

	await app.listen(config.get("HTTP_PORT"), () =>
		logger.log(`HTTP Server: http://${config.get("HTTP_HOST")}:${config.get("HTTP_PORT")}${config.get("HTTP_PREFIX")}`)
	);
}
bootstrap().then();

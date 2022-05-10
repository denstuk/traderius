import { INestApplication, LoggerService } from "@nestjs/common";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { ConfigService } from "@nestjs/config";

export const DocumentationBuilder = (
	application: INestApplication,
	config: ConfigService,
	logger: LoggerService
): void => {
	if (config.get("NODE_ENV") === "production") return;

	let serverUrl: string;
	if (config.get("NODE_ENV") === "development") {
		serverUrl = `http://${config.get("HTTP_HOST")}:${config.get("HTTP_PORT")}${config.get("HTTP_PREFIX")}`;
	} else {
		serverUrl = `https://${config.get("HTTP_HOST")}${config.get("HTTP_PREFIX")}`;
	}

	const documentationBuilder = new DocumentBuilder()
		.setTitle(`${config.get("SERVICE_NAME")} Microservice`)
		.setDescription("REST API Documentation")
		.setVersion(`${config.get("HTTP_VERSION")}`)
		.addServer(serverUrl)
		.addBearerAuth()
		.build();

	const document = SwaggerModule.createDocument(application, documentationBuilder);
	SwaggerModule.setup(`${config.get("HTTP_PREFIX")}/docs`, application, document);

	if (logger) {
		logger.log(`Documentation: ${serverUrl}/docs`);
	}
};

import { INestApplication, Logger } from "@nestjs/common";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { ConfigService } from "@nestjs/config";

const logger = new Logger();

export const DocumentationBuilder = (application: INestApplication, config: ConfigService) => {
  if (config.get("NODE_ENV") === "production") {
    return;
  }

  const serverUrl = `http://${config.get("HTTP_HOST")}:${config.get("HTTP_PORT")}`;
  const docPath = `${config.get("HTTP_PREFIX")}/v${config.get("HTTP_VERSION")}/docs`;
  const docUrl = `${serverUrl}${docPath}`;

  const documentationBuilder = new DocumentBuilder()
    .setTitle(`${config.get("SERVICE_NAME")} service`)
    .setDescription("REST API Documentation")
    .setVersion(`${config.get("HTTP_VERSION")}`)
    .addServer(serverUrl)
    .build();

  const document = SwaggerModule.createDocument(application, documentationBuilder);
  SwaggerModule.setup(docPath, application, document);

  logger.log(`Documentation: ${docUrl}`);
};

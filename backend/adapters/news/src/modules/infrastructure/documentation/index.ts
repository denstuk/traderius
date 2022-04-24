import { INestApplication } from "@nestjs/common";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { ConfigService } from "@nestjs/config";

export const DocumentationBuilder = (application: INestApplication, config: ConfigService) => {
  if (config.get("NODE_ENV") === "production") {
    return;
  }

  const documentationBuilder = new DocumentBuilder()
    .setTitle(`${config.get("SERVICE_NAME")} service`)
    .setDescription("REST API Documentation")
    .setVersion(`${config.get("HTTP_VERSION")}`)
    .addServer(`http://${config.get("HTTP_HOST")}:${config.get("HTTP_PORT")}`)
    .build();

  const document = SwaggerModule.createDocument(application, documentationBuilder);
  SwaggerModule.setup(`${config.get("HTTP_PREFIX")}/v${config.get("HTTP_VERSION")}/docs`, application, document);
};

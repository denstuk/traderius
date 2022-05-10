import { NestFactory } from "@nestjs/core";
import { AppModule } from "./modules/app.module";
import { ConfigService } from "@nestjs/config";
import { Logger, VersioningType } from "@nestjs/common";
import { DocumentationBuilder } from "./modules/documentation";

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  const config = app.get(ConfigService);
  const logger = new Logger("Application");

  app.setGlobalPrefix(config.get("HTTP_PREFIX"));
  app.enableVersioning({
    type: VersioningType.URI,
  });

  DocumentationBuilder(app, config, logger);

  await app.listen(config.get("HTTP_PORT"));
}
bootstrap().then();

import { NestFactory } from "@nestjs/core";
import { AppModule } from "./modules/app.module";
import { ConfigService } from "@nestjs/config";
import { VersioningType } from "@nestjs/common";
import { DocumentationBuilder } from "./modules/infrastructure/documentation";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = app.get(ConfigService);

  app.setGlobalPrefix(config.get("HTTP_PREFIX"));
  app.enableVersioning({
    type: VersioningType.URI,
  });

  DocumentationBuilder(app, config);

  await app.listen(config.get("HTTP_PORT"));
}
bootstrap().then();

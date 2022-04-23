import { NestFactory } from "@nestjs/core";
import { AppModule } from "./modules/app.module";
import { MicroserviceOptions, Transport } from "@nestjs/microservices";
import { ConfigService } from "@nestjs/config";

async function bootstrap() {
  const context = await NestFactory.createApplicationContext(AppModule);
  const config = context.get(ConfigService);

  const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
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
  await app.listen();
}
bootstrap().then();

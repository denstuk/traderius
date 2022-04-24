import { CacheModule, Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { InfrastructureModule } from "./infrastructure/infrastructure.module";
import { FinanceNewsModule } from "./finance-news/finance.news.module";
import { ConfigModule, ConfigService } from "@nestjs/config";
import * as redisStore from "cache-manager-redis-store";

@Module({
  imports: [
    InfrastructureModule,
    CacheModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => ({
        store: redisStore,
        socket: {
          host: config.get("REDIS_HOST"),
          port: config.get("REDIS_PORT"),
        },
        isGlobal: true,
      }),
    }),
    FinanceNewsModule,
  ],
  controllers: [AppController],
})
export class AppModule {}

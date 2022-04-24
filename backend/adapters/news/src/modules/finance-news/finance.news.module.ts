import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { FinanceNewsService } from "./finance-news.service";
import { RedisModule } from "../infrastructure/redis/redis.module";

@Module({
  imports: [ConfigModule],
  providers: [FinanceNewsService],
  exports: [FinanceNewsService],
})
export class FinanceNewsModule {}

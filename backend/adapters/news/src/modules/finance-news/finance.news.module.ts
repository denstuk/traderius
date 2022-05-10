import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { FinanceNewsService } from "./finance-news.service";
import { HttpModule } from "@nestjs/axios";
import { RedisCacheModule } from "../redis-cache/redis-cache.module";

@Module({
  imports: [ConfigModule, HttpModule, RedisCacheModule],
  providers: [FinanceNewsService],
  exports: [FinanceNewsService],
})
export class FinanceNewsModule {}

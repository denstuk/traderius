import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { FinanceNewsModule } from "./finance-news/finance.news.module";
import { ConfigurationModule } from "./configuration/configuration.module";

@Module({
  imports: [ConfigurationModule, FinanceNewsModule],
  controllers: [AppController],
})
export class AppModule {}

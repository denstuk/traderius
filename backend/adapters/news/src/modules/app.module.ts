import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { InfrastructureModule } from "./infrastructure/infrastructure.module";
import { FinanceNewsModule } from "./finance-news/finance.news.module";

@Module({
  imports: [InfrastructureModule, FinanceNewsModule],
  controllers: [AppController],
})
export class AppModule {}

import { MiddlewareConsumer, Module } from "@nestjs/common";
import { ConfigurationModule } from "./configuration/configuration.module";
import { DatabaseModule } from "./database/database.module";
import { AuthModule } from "./auth/auth.module";
import { UsersModule } from "./users/users.module";
import { LoggerMiddleware } from "./middlewares/logger.middleware";

@Module({
	imports: [ConfigurationModule, DatabaseModule, UsersModule, AuthModule],
})
export class AppModule {
	configure(consumer: MiddlewareConsumer): void {
		consumer.apply(LoggerMiddleware).forRoutes("*");
	}
}

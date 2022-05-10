import { TypeOrmModule } from "@nestjs/typeorm";
import { ConfigService } from "@nestjs/config";

export const DatabaseModule = TypeOrmModule.forRootAsync({
	inject: [ConfigService],
	useFactory: (config: ConfigService) => ({
		type: config.get<any>("DATABASE_CONNECTION"),
		host: config.get<string>("DATABASE_HOST"),
		port: Number(config.get("DATABASE_PORT")),
		username: config.get<string>("DATABASE_USERNAME"),
		password: config.get<string>("DATABASE_PASSWORD"),
		database: config.get<string>("DATABASE_DATABASE"),
		logging: config.get<string>("DATABASE_LOGGING") === "true",
		synchronize: false,
		migrationsRun: config.get<string>("DATABASE_MIGRATIONS_RUN") === "true",
		migrationsTableName: config.get<string>("DATABASE_MIGRATIONS_TABLE_NAME"),
		entities: [config.get("DATABASE_ENTITIES")],
		migrations: [config.get("DATABASE_MIGRATIONS")],
		cli: {
			migrationsDir: config.get("DATABASE_MIGRATIONS_DIR"),
		},
	}),
});

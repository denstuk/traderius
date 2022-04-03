import * as typeorm from "typeorm";
import { Logger } from "../logger";
import { Configuration } from "../configuration";

export class Database {
	protected static connection: typeorm.Connection;

	static async connect(): Promise<void> {
		const config = await typeorm.getConnectionOptions(Configuration.get<string>("Env"));
		Database.connection = await typeorm.createConnection({ ...config, name: "default" });
		await Database.connection.runMigrations();
		Logger.info("Database connected");
	}

	static async disconnect(): Promise<void> {
		if (this.connection) await this.connection.close();
		Logger.info("Database disconnected");
	}
}

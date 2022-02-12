import * as typeorm from "typeorm";
import { Logger } from "../logger";
import { Configuration } from "../configuration";

export class Database {
	private static connection: typeorm.Connection;

	static async connect(): Promise<void> {
		const config = await typeorm.getConnectionOptions(Configuration.get<string>("Env"));
		Database.connection = await typeorm.createConnection({ ...config, name: "default" });
		Logger.info("Database connected");
	}

	static async disconnect(): Promise<void> {
		if (this.connection) await this.connection.close();
		Logger.info("Database disconnected");
	}
}

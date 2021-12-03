import { Connection, createConnection } from "typeorm";
import { Logger } from "../logger";

export class Database {
	static connection: Connection

	static async connect(): Promise<void> {
		try {
			Database.connection = await createConnection();
			await Database.connection.runMigrations();

			Logger.info("Database connected");

			// eslint-disable-next-line  @typescript-eslint/no-explicit-any
		} catch (error: any) {
			Logger.error(error);
		}
	}
}

import * as typeorm from "typeorm";
import { Config } from "./config";
import { Logger } from "./logger";

export class Database {
    private static connection: typeorm.Connection;

    static async connect(): Promise<void> {
        const config = await typeorm.getConnectionOptions(Config.get<string>("Env"));
        Database.connection = await typeorm.createConnection(config);
        Logger.info("Database connected");
    }

    static async disconnect(): Promise<void> {
        if (this.connection) await this.connection.close();
        Logger.info("Database disconnected");
    }
}

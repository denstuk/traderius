import { HttpServer } from "./app/http/server";
import { Database } from "./infra/database/database";
import { Logger } from "./infra/logger";
import { Redis } from "./infra/redis";

export class Application {
    static async up(): Promise<void> {
        Logger.info("Application started");
        await Database.connect();
        await Redis.connect();
        await HttpServer.up();
    }

    static async down(): Promise<void> {
        await HttpServer.down();
        await Database.disconnect();
        Logger.info("Application closed");
    }
}

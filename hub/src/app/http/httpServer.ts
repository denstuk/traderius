import http from "http";
import express from "express";
import { attachControllers } from "@decorators/express";
import { HealthController } from "./controllers/health";
import { Logger } from "../../infra/logger";
import { NewsController } from "./controllers/news";

export class HttpServer {
    private static server: http.Server | undefined;

    static async up(): Promise<void> {
        const app = express();
        app.use(express.json({ limit: "20mb" }));

        const router = express.Router();
        attachControllers(router, [HealthController, NewsController]);

        app.use("/api", router);
        this.server = http.createServer(app);
        this.server.listen(4400, () => Logger.info("Server listening"));
    }

    static async down(): Promise<void> {
        if (this.server) { 
            return new Promise<void>(res => {
                this.server!.close(() => Logger.info("Server shutdowned"));
                res();
            })
        }
    }
}
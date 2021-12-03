import http from "http";
import express from "express";
import "express-async-errors";
import { Logger } from "../../infra/logger";
import { HttpRouter } from "./router";
import { Config } from "../../infra/config";
import { ErrorGuard } from "./guards/error.guard";

export class HttpServer {
    private static server: http.Server | undefined;

    static async up(): Promise<void> {
        const app = express();
        app.use(express.json({ limit: "20mb" }));
        HttpRouter.register(app);
        app.use(ErrorGuard);
        this.server = http.createServer(app);
        this.server.listen(Config.get<number>("Port"), () => Logger.info("Server listening"));
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
import express from "express";
import cors from "cors";
import { HealthRouter } from "./routers/health.router";
import { NewsRouter } from "./routers/news.router";
import { AuthRouter } from "./routers/auth.router";

export class HttpRouter {
    static register(app: express.Application): void {
        const httpRouter = express.Router();
        httpRouter.use(cors());
        httpRouter.use("/health", HealthRouter);
        httpRouter.use("/auth", AuthRouter);
        httpRouter.use("/news", NewsRouter);
        app.use("/api", httpRouter);
    }
}

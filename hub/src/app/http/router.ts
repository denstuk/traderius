import express from "express";
import cors from "cors";
import { HealthRouter } from "./routers/v1/health.router";
import { NewsRouter } from "./routers/v1/news.router";
import { AuthRouter } from "./routers/v1/auth.router";
import { AnalysisRouter } from "./routers/v1/analysis.router";
import { StocksRouter } from "./routers/v1/stocks.router";
import { UsersRouter } from "./routers/v1/users.router";
import { MetricsRouter } from "./routers/v1/metrics.router";

export class HttpRouterV1 {
	static register(app: express.Application): void {
		const httpRouter = express.Router();
		httpRouter.use(cors());
		httpRouter.use("/health", HealthRouter);
		httpRouter.use("/auth", AuthRouter);
		httpRouter.use("/news", NewsRouter);
		httpRouter.use("/analysis", AnalysisRouter);
		httpRouter.use("/stocks", StocksRouter);
		httpRouter.use("/users", UsersRouter);
		httpRouter.use("/metrics", MetricsRouter);
		app.use("/api/v1", httpRouter);
	}
}

import express from "express";
import { MetricsRouter } from "./routers/v1/metrics.routes";

export class HttpRouterV1 {
	static register(app: express.Application): void {
		const httpRouter = express.Router();
		httpRouter.use("/metrics", MetricsRouter);
		app.use("/api/v1", httpRouter);
	}
}

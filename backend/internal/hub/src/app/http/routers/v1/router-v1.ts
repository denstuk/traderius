import express from "express";
import { injectable } from "inversify";
import { HealthRouter } from "./health/health.router";
import { MetricsRouter } from "./metrics/metrics.router";
import { StocksRouter } from "./stocks/stocks.router";
import { AnalysisRouter } from "./analysis/analysis.router";
import { AuthRouter } from "./authentication/auth.router";
import { UsersRouter } from "./users/users.router";

@injectable()
export class RouterV1 {
	use(app: express.Application): void {
		const routerV1 = express.Router();
		routerV1.use("/health", HealthRouter);
		routerV1.use("/metrics", MetricsRouter);
		routerV1.use("/stocks", StocksRouter);
		routerV1.use("/analytics", AnalysisRouter);
		routerV1.use("/auth", AuthRouter);
		routerV1.use("/users", UsersRouter);
		app.use("/api/v1", routerV1);
	}
}

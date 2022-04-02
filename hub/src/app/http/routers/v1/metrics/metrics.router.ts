import Prometheus from "prom-client";
import express, { Request, Response } from "express";

const register = new Prometheus.Registry();
Prometheus.collectDefaultMetrics({
	prefix: "hub_service_",
	gcDurationBuckets: [0.001, 0.01, 0.1, 1, 2, 5],
	register,
});

const router = express.Router();

router.all("/", async (req: Request, res: Response) => {
	res.setHeader("Content-Type", register.contentType);
	res.send(await register.metrics());
});

export { router as MetricsRouter };

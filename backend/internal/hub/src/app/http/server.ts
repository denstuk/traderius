import http from "http";
import express from "express";
import "express-async-errors";
import cors from "cors";
import { Configuration, Logger } from "../../infra";
import { ErrorGuard } from "./middlewares/guards/error.guard";
import { LogMiddleware } from "./middlewares/log.middleware";
import { RouterV1 } from "./routers/v1/router-v1";
import { ioc } from "../../ioc";
import { injectable } from "inversify";

@injectable()
export class HttpServer {
	private readonly logger: Logger = ioc.resolve(Logger);
	private server: http.Server | undefined;

	async start(): Promise<void> {
		const host = Configuration.get<string>("Host");
		const port = Configuration.get<number>("Port");

		const application = this.buildExpressApplication();

		this.server = http.createServer(application);
		this.server.listen(port, () => this.logger.info(`HTTP Server: http://${host}:${port}`));
	}

	private buildExpressApplication(): express.Application {
		const application = express();

		application.use(cors());
		application.use(express.json({ limit: "20mb" }));
		application.use(LogMiddleware);

		ioc.resolve(RouterV1).use(application);

		application.use(ErrorGuard);
		return application;
	}
}

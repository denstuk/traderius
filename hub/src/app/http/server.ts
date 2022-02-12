import http from "http";
import express from "express";
import "express-async-errors";
import { Logger } from "../../infra/logger";
import { HttpRouter } from "./router";
import { ErrorGuard } from "./guards/error.guard";
import { Configuration } from "../../infra";

export class HttpServer {
	private static server: http.Server | undefined;

	static async up(): Promise<void> {
		const host = Configuration.get<string>("Host");
		const port = Configuration.get<number>("Port");

		const app = this.configure(express());
		this.server = http.createServer(app);

		this.server.listen(port, () => Logger.info(`Server started on http://${host}:${port}`));
	}

	static async down(): Promise<void> {
		if (this.server) {
			return new Promise<void>((res) => {
				this.server!.close(() => Logger.info("Server shutdowned"));
				res();
			});
		}
	}

	private static configure(app: express.Application): express.Application {
		app.use(express.json({ limit: "20mb" }));
		HttpRouter.register(app);
		app.use(ErrorGuard);
		return app;
	}
}

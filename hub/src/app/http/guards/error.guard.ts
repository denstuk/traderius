import { Request, Response, NextFunction } from "express";
import { HttpError } from "../core/http.error";
import { Configuration } from "../../../infra";
import { Logger } from "../../../infra/logger";

export const ErrorGuard = (err: Error, req: Request, res: Response, _: NextFunction) => {
	Logger.error(err.message);

	if (err instanceof HttpError) {
		return res.status(err.status).send({ statusCode: err.status, details: err.message });
	}

	if (Configuration.get<string>("Env") === "develop") {
		return res.status(500).send({ statusCode: 500, message: err.message });
	}
	return res.status(500).send({ statusCode: 500, message: "Internal error" });
};

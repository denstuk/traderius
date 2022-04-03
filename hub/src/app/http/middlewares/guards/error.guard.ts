import { Request, Response, NextFunction } from "express";
import { HttpError } from "../../core/http.error";
import { Configuration, Logger } from "../../../../infra";
import { ioc } from "../../../../ioc";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const ErrorGuard = (err: Error, req: Request, res: Response, _: NextFunction) => {
	ioc.resolve(Logger).error(err.message);

	if (err instanceof HttpError) {
		return res.status(err.status).send({ statusCode: err.status, details: err.message });
	}

	if (Configuration.get<string>("Env") === "develop") {
		return res.status(500).send({ statusCode: 500, message: err.message });
	}
	return res.status(500).send({ statusCode: 500, message: "Internal error" });
};

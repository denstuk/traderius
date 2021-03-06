import { Request, Response, NextFunction } from "express";
import { Logger } from "../../../infra";
import { ioc } from "../../../ioc";

export const LogMiddleware = (req: Request, res: Response, next: NextFunction): void => {
	const url = req.url;
	const start = Date.now();
	next();
	const time = Date.now() - start;

	ioc.resolve(Logger).info(`HTTP - ${res.statusCode} ${url} ${time}ms`);
};

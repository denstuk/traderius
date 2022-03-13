import { Request, Response, NextFunction } from "express";
import { Logger } from "../../../infra";

export const LogMiddleware = (req: Request, res: Response, next: NextFunction): void => {
	const message = `Request ${req.url}`;
	Logger.info(message);
	next();
};

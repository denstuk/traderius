import { Request, Response, NextFunction } from "express";
import { Logger } from "../../../infra";

export const LogMiddleware = (req: Request, res: Response, next: NextFunction) => {
	const message = `Request ${req.url}`;
	Logger.info(message);
	next();
};

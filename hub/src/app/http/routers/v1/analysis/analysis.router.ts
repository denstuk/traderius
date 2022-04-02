import express, { Request, Response } from "express";
import { ioc } from "../../../../../ioc";
import { AnalysisController } from "./analysis.controller";

const router = express.Router();

router.get("/:ticker", [], async (req: Request, res: Response) => {
	const result = await ioc.resolve(AnalysisController).analysis({ ticker: req.params.ticker });
	return res.status(200).send(result);
});

export { router as AnalysisRouter };

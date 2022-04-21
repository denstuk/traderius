import express, { Request, Response } from "express";
import { ioc } from "../../../../../ioc";
import { StocksNews } from "../../../../../infra";

const router = express.Router();

router.get("/", async (req: Request, res: Response) => {
	const news = await ioc.resolve(StocksNews).fetch();
	return res.status(200).send(news);
});

export { router as NewsRouter };

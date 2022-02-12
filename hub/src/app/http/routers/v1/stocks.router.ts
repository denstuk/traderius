import express, { Request, Response } from "express";
import { Configuration, TinkoffMarket } from "../../../../infra";

const router = express.Router();

router.get("/:ticker", async (req: Request, res: Response) => {
	const market = new TinkoffMarket(Configuration.get<string>("TinkoffSharedToken"));
	const result = await market.history(req.params.ticker);
	return res.status(200).send(result.candles);
});

export { router as StocksRouter };

import express, { Request, Response } from "express";
import dayjs from "dayjs";
import { Configuration } from "../../../../../infra";
import { CandleInterval, InstrumentIdentifierType, TinkoffV1Rest } from "../../../../../infra/markets/tinkoff-v1-rest";
import { TinkoffV1Converter } from "../../../../../infra/markets/tinkoff-v1-rest/converter/tinkoff-v1-converter";
import { ioc } from "../../../../../ioc";
import { StocksAnalysis } from "../../../../../domain/analysis/stocks-analysis/stocks-analysis";

const router = express.Router();

router.get("/profitable", async (req: Request, res: Response) => {
	const analysisStocks = ioc.resolve(StocksAnalysis);
	const result = await analysisStocks.getMostProfitable();
	return res.status(200).send(result);
});

router.get("/:ticker", async (req: Request, res: Response) => {
	const marketV1 = new TinkoffV1Rest(Configuration.get<string>("TinkoffSharedToken"));

	const { instrument } = await marketV1.getInstrumentBy({
		idType: InstrumentIdentifierType.InstrumentIdTypeTicker,
		id: req.params.ticker,
	});

	const now = dayjs();
	const lastMonth = now.subtract(1, "month");

	const { candles } = await marketV1.getCandles({
		figi: instrument.figi,
		from: lastMonth.toISOString(),
		to: now.toISOString(),
		interval: CandleInterval.Day,
	});

	const mappedCandles = new TinkoffV1Converter().convertCandles(candles);
	return res.status(200).send(mappedCandles);
});

export { router as StocksRouter };

import { inject, injectable } from "inversify";
import { Configuration, Logger, Redis, Thread, TinkoffMarket } from "../../infra";
import { Predictor } from "../../infra/predictor";

@injectable()
export class AnalyzeStocksScheduler {
	constructor(
		@inject(Redis) private readonly redis: Redis,
		@inject(Predictor) private readonly predictor: Predictor,
		@inject(Thread) private readonly thread: Thread
	) {}

	async run(): Promise<void> {
		await this.job();
	}

	private async job(): Promise<void> {
		Logger.info("AnalyzeStocks: Job started");

		const market = new TinkoffMarket(Configuration.get("TinkoffSharedToken"));
		const stocks = await market.stocks(); // Receive all available stocks from Tinkoff Market
		const limited = stocks.instruments.slice(-10);
		const stockToPredicted = new Map<string, number>();

		for (const stock of limited) {
			const candlesResponse = await market.history(stock.ticker);
			if (!candlesResponse || candlesResponse.candles.length === 0) continue;

			const stockHistoricalLast = candlesResponse.candles.slice(-60);
			const stockClosePrices = stockHistoricalLast.map((c) => c.c);
			const prediction = await this.predictor.predict(stockClosePrices);

			stockToPredicted.set(stock.ticker, prediction.prediction.lstm7);
			await this.thread.sleep(200);
		}

		const stockToPredictedArray = Array.from(stockToPredicted);
		stockToPredictedArray.sort((a, b) => (a[1] > b[1] ? 1 : -1));

		Logger.info("AnalyzeStocks: Job finished");
	}
}

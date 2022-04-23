import { injectable } from "inversify";
import { Configuration, Logger, Redis, Thread } from "../../../infra";
import { ioc } from "../../../ioc";
import { CandleInterval, TinkoffV1Rest } from "../../../infra/markets/tinkoff-v1-rest";
import { IProfitableStock } from "./stocks-analysis.types";
import dayjs from "dayjs";
import { TinkoffV1Converter } from "../../../infra/markets/tinkoff-v1-rest/converter/tinkoff-v1-converter";
import { Predictor } from "../../../infra/predictor";

@injectable()
export class StocksAnalysis {
	private readonly stocksAnalysisKey: string = "analysis:profitable-stocks";
	private readonly redis: Redis = ioc.resolve(Redis);
	private readonly predictor: Predictor = ioc.resolve(Predictor);
	private readonly thread: Thread = ioc.resolve(Thread);
	private readonly logger: Logger = ioc.resolve(Logger);
	private readonly converter: TinkoffV1Converter = ioc.resolve(TinkoffV1Converter);

	async getMostProfitable(): Promise<IProfitableStock[]> {
		const result = await this.redis.getObject<{ stocks: IProfitableStock[] }>(this.stocksAnalysisKey);
		return result ? result.stocks : [];
	}

	async refreshMostProfitable(): Promise<void> {
		const market = new TinkoffV1Rest(Configuration.get("TinkoffSharedToken"));

		const { instruments } = await market.shares();
		const shorten = instruments.slice(0, 100);

		const now = dayjs();
		const past = now.subtract(3, "month");

		const store: IProfitableStock[] = [];
		let i = 0;
		for (const instrument of shorten) {
			try {
				const { candles: rawCandles } = await market.getCandles({
					figi: instrument.figi,
					from: past.toISOString(),
					to: now.toISOString(),
					interval: CandleInterval.Day,
				});

				const _candles = this.converter.convertCandles(rawCandles);
				const stockHistoricalLast = _candles.slice(-60);
				const lastCandle = _candles[_candles.length - 1];
				const stockClosePrices = stockHistoricalLast.map((c) => c.close);

				const prediction = await this.predictor.predict(stockClosePrices);
				store.push({
					ticker: instrument.ticker,
					predicted: prediction.prediction.lstm7,
					growthPercent: this.getPercentChange(lastCandle.close, prediction.prediction.lstm7),
					type: instrument.shareType,
					companyName: instrument.name,
				});
			} catch (err: unknown) {
				if (err instanceof Error) {
					this.logger.warning(`Refresh profitable process: ${err.message}; Ticker=${instrument.ticker}`);
				}
			}

			await this.thread.sleep(500);
			i += 1;
			this.logger.debug(`Refresh profitable process: ${i}:${instruments.length}`);
		}

		await this.redis.set(this.stocksAnalysisKey, {
			stocks: this.ejectMostProfitable(store),
		});
	}

	private getPercentChange(a: number, b: number): number {
		return ((a - b) / b) * 100;
	}

	private ejectMostProfitable(stocks: IProfitableStock[]): IProfitableStock[] {
		const sorted = stocks.sort((a, b) => (a.growthPercent > b.growthPercent ? -1 : 1));
		return sorted.slice(0, 20);
	}
}

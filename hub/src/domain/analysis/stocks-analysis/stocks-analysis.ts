import {injectable} from "inversify";
import {Configuration, Redis, Thread} from "../../../infra";
import {ioc} from "../../../ioc";
import {CandleInterval, TinkoffV1Rest} from "../../../infra/markets/tinkoff-v1-rest";
import {IProfitableStock} from "./stocks-analysis.types";
import dayjs from "dayjs";
import {TinkoffV1Converter} from "../../../infra/markets/tinkoff-v1-rest/converter/tinkoff-v1-converter";
import {Predictor} from "../../../infra/predictor";

@injectable()
export class StocksAnalysis {
	private readonly redis: Redis = ioc.resolve(Redis);
	private readonly predictor: Predictor = ioc.resolve(Predictor);
	private readonly thread: Thread = ioc.resolve(Thread);
	private readonly stocksAnalysisKey: string = "analysis:profitable-stocks";

	async getMostProfitable(): Promise<IProfitableStock[]> {
		const result = await this.redis.getObject<{ stocks: IProfitableStock[] }>(this.stocksAnalysisKey);
		return result ? result.stocks : [];
	}

	async refreshMostProfitable(): Promise<void> {
		const market = new TinkoffV1Rest(Configuration.get("TinkoffSharedToken"));
		const marketConverter = new TinkoffV1Converter();

		const { instruments } = await market.shares();

		const now = dayjs();
		const past = now.subtract(3, "month");

		const store: IProfitableStock[] = [];
		for (const instrument of instruments) {
			const { candles } = await market.getCandles({
				figi: instrument.figi,
				from: past.toISOString(),
				to: now.toISOString(),
				interval: CandleInterval.Day,
			});

			const _candles = marketConverter.convertCandles(candles);
			const stockHistoricalLast = _candles.slice(-60);
			const lastCandle = _candles[_candles.length - 1];
			const stockClosePrices = stockHistoricalLast.map((c) => c.close);

			const prediction = await this.predictor.predict(stockClosePrices);
			store.push({
				ticker: instrument.ticker,
				predicted: prediction.prediction.lstm7,
				growthPercent: this.getPercentChange(lastCandle.close, prediction.prediction.lstm7),
			});

			await this.thread.sleep(200);
		}

		store.sort((a, b) => a.growthPercent > b.growthPercent ? 1 : -1);
		const mostProfitable = store.slice(10);

		await this.redis.set(this.stocksAnalysisKey, { stocks: mostProfitable });
	}

	private getPercentChange(a: number, b: number): number {
		return ((a - b) / b) * 100;
	}
}

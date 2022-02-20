import { CronJob } from "cron";
import { Configuration, ioc, Thread, TinkoffMarket } from "../../infra";
import { UserService } from "../../domain/users/user.service";
import { UserStrategy } from "../../domain/users/users.types";
import { Predictor } from "../../infra/predictor";

export class AutomatedTradingScheduler {
	static async run(): Promise<void> {
		const cronJob = new CronJob("", this.job, null, true, "Europe/Moscow");
		cronJob.start();
	}

	static async job(): Promise<void> {
		const userService = ioc.resolve(UserService);
		const thread = ioc.resolve(Thread);
		const predictor = ioc.resolve(Predictor);

		const automatedUsers = await userService.getUsersWithStrategy([UserStrategy.Automated]);
		for (const user of automatedUsers) {
			if (!user.tinkoffMarketToken) continue;

			const marketService = new TinkoffMarket(Configuration.get("TinkoffSharedToken"));
			const assets = await marketService.portfolio();
			const stocks = assets.positions.filter((a) => a.instrumentType === "Stock");

			type Prediction = {
				ticker: string;
				lastPrice: number;
				price: number;
				currency: string;
				expectedTinkoff?: number;
			};
			const predictions: Prediction[] = [];
			for (const stock of stocks) {
				if (!stock.ticker) continue;

				const instrument = await marketService.getInstrumentByTicker(stock.ticker);

				const stockHistorical = await marketService.history(stock.ticker);
				const stockHistoricalLast = stockHistorical.candles.slice(-60);
				const stockClosePrices = stockHistoricalLast.map((c) => c.c);
				const { prediction } = await predictor.predict(stockClosePrices);
				predictions.push({
					ticker: stock.ticker,
					lastPrice: stockClosePrices[stockClosePrices.length - 1],
					price: (prediction.lstm7 + prediction.lstm30) / 2,
					currency: instrument.currency!,
					expectedTinkoff: stock.expectedYield?.value,
				});
				await thread.sleep(200);
			}

			const calcDiff = (from: number, to: number) => (to * 100) / from - 100;

			type PredictionWithIndicator = Prediction & { indicator: number };
			const predictionsWithRoi: PredictionWithIndicator[] = [];
			for (const prediction of predictions) {
				const indicator: number = calcDiff(prediction.lastPrice, prediction.price);
				predictionsWithRoi.push({ ...prediction, indicator });
			}

			predictionsWithRoi.sort((a, b) => (a.indicator > b.indicator ? -1 : 1));

			const forSell: PredictionWithIndicator[] = [];
			for (const prediction of predictionsWithRoi) {
				if (prediction.indicator < 0 && prediction.expectedTinkoff! < 0) {
					forSell.push(prediction);
				}
			}
			console.log(forSell);
		}
	}
}

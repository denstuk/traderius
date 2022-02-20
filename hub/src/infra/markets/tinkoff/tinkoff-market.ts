import OpenAPI, {
	Candles,
	Currencies,
	MarketInstrument,
	MarketInstrumentList,
	Portfolio,
} from "@tinkoff/invest-openapi-js-sdk";
import { Configuration } from "../../configuration";
import dayjs from "dayjs";

export class TinkoffMarket {
	private readonly connection: OpenAPI;

	constructor(token: string) {
		this.connection = new OpenAPI({
			apiURL: Configuration.get("TinkoffApiUrl"),
			socketURL: Configuration.get("TinkoffWsUrl"),
			secretToken: token,
		});
	}

	async balance(): Promise<Currencies> {
		return await this.connection.portfolioCurrencies();
	}

	async stocks(): Promise<MarketInstrumentList> {
		return await this.connection.stocks();
	}

	async portfolio(): Promise<Portfolio> {
		return await this.connection.portfolio();
	}

	async history(ticker: string): Promise<Candles> {
		const to = dayjs().toISOString();
		const from = dayjs().subtract(3, "month").toISOString();
		const { figi } = await this.getInstrumentByTicker(ticker);
		return await this.connection.candlesGet({ from, to, figi, interval: "day" });
	}

	async buyAsset(ticker: string, amount: number): Promise<void> {
		const { figi } = await this.getInstrumentByTicker(ticker);
		await this.connection.marketOrder({ figi, lots: amount, operation: "Buy" });
	}

	async sellAsset(ticker: string, amount: number): Promise<void> {
		const { figi } = await this.getInstrumentByTicker(ticker);
		await this.connection.marketOrder({ figi, lots: amount, operation: "Sell" });
	}

	async getInstrumentByTicker(ticker: string): Promise<MarketInstrument> {
		const marketInstrumentList = await this.connection.search({ ticker });
		if (marketInstrumentList.instruments.length === 0) throw new Error("Instrument not found by ticker");
		if (!marketInstrumentList.instruments[0].figi) throw new Error("Missing figi of the instrument by ticker");
		return marketInstrumentList.instruments[0];
	}
}

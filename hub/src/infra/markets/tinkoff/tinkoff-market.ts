import OpenAPI, {Candles, Currencies} from "@tinkoff/invest-openapi-js-sdk";
import {Configuration} from "../../configuration";
import dayjs from "dayjs";

export class TinkoffMarket {
	private readonly connection: OpenAPI;

	constructor(token: string) {
		this.connection = new OpenAPI({
			apiURL: Configuration.get("TinkoffApiUrl"),
			socketURL: Configuration.get("TinkoffWsUrl"),
			secretToken: token
		});
	}

	async balance(): Promise<Currencies> {
		return await this.connection.portfolioCurrencies();
	}

	async history(ticker: string): Promise<Candles> {
		const today = dayjs().toISOString();
		const monthAgo = dayjs().subtract(1, 'month').toISOString();
		const result = await this.connection.search({ ticker });
		return await this.connection.candlesGet({ from: monthAgo, to: today, figi: result.instruments[0].figi, interval: 'day' });
	}
}

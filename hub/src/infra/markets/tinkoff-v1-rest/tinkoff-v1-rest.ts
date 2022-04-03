import axios from "axios";
import {
	GetCandlesRequest,
	GetDividendsRequest,
	GetInstrumentByRequest,
	GetPortfolioResponse,
	GetSharesRequest
} from "./types/api.types";
import {ICandle, IMarketInstrument, IShare} from "./types/base.types";
import { DEFAULT_CLASS_CODE } from "./tinkoff-v1-rest.constants";
import { Logger } from "../../logger";
import {ioc} from "../../../ioc";

/**
 * Interface for Tinkoff Invest API
 * https://tinkoff.github.io/investAPI/swagger-ui/#/
 */
export class TinkoffV1Rest {
	private readonly logger: Logger = ioc.resolve(Logger);
	private readonly token: string;
	private readonly url: string = "https://invest-public-api.tinkoff.ru/rest";
	private readonly instrumentsService: string = "/tinkoff.public.invest.api.contract.v1.InstrumentsService";
	private readonly ordersService: string = "/tinkoff.public.invest.api.contract.v1.OrdersService";
	private readonly operationsService: string = "/tinkoff.public.invest.api.contract.v1.OperationsService";
	private readonly usersService: string = "/tinkoff.public.invest.api.contract.v1.UsersService";
	private readonly marketDataService: string = "/tinkoff.public.invest.api.contract.v1.MarketDataService";

	constructor(token: string) {
		this.token = token;
	}

	private get jwt(): string {
		return `Bearer ${this.token}`;
	}

	async shares(data: GetSharesRequest = {}): Promise<{ instruments: IShare[] }> {
		const response = await axios({
			method: "POST",
			url: `${this.url}${this.instrumentsService}/Shares`,
			data: data,
			headers: { authorization: this.jwt },
		});
		this.logger.debug(`Received from Tinkoff: ${JSON.stringify(response.data, null, 4)}`);
		return response.data;
	}

	async getInstrumentBy(data: GetInstrumentByRequest = {}): Promise<{ instrument: IMarketInstrument }> {
		const response = await axios({
			method: "POST",
			url: `${this.url}${this.instrumentsService}/GetInstrumentBy`,
			data: { ...data, classCode: DEFAULT_CLASS_CODE },
			headers: { authorization: this.jwt },
		});
		this.logger.debug(`Received from Tinkoff: ${JSON.stringify(response.data, null, 4)}`);
		return response.data;
	}

	async getDividends(data: GetDividendsRequest): Promise<void> {
		const response = await axios({
			method: "POST",
			url: `${this.url}${this.instrumentsService}/GetDividends`,
			data: data,
			headers: { authorization: this.jwt },
		});
		this.logger.debug(`Received from Tinkoff: ${JSON.stringify(response.data, null, 4)}`);
		return response.data;
	}

	async getPortfolio(accountId: string): Promise<GetPortfolioResponse> {
		const response = await axios({
			method: "POST",
			url: `${this.url}${this.operationsService}/GetPortfolio`,
			data: { accountId },
			headers: { authorization: this.jwt },
		});
		this.logger.debug(`Received from Tinkoff: ${JSON.stringify(response.data, null, 4)}`);
		return response.data;
	}

	async getAccounts(): Promise<void> {
		const response = await axios({
			method: "POST",
			url: `${this.url}${this.usersService}/GetAccounts`,
			data: {},
			headers: { authorization: this.jwt },
		});
		this.logger.debug(`Received from Tinkoff: ${JSON.stringify(response.data, null, 4)}`);
		return response.data;
	}

	async getCandles(data: GetCandlesRequest): Promise<{ candles: ICandle[] }> {
		const response = await axios({
			method: "POST",
			url: `${this.url}${this.marketDataService}/GetCandles`,
			data: { ...data },
			headers: { authorization: this.jwt },
		});
		this.logger.debug(`Received from Tinkoff: ${JSON.stringify(response.data, null, 4)}`);
		return response.data;
	}
}

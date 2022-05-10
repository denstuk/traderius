import axios from "axios";
import {
	GetCandlesRequest,
	GetDividendsRequest,
	GetInstrumentByRequest,
	GetPortfolioResponse,
	GetSharesRequest,
	PostOrderRequestParams,
	AccountAccessLevel,
	IAccount,
	ICandle,
	ICurrency,
	IMarketInstrument,
	IShare,
	GetOrdersRequestParams,
	PostOrderResponse,
	GetOrdersResponse,
} from "./types";
import { DEFAULT_CLASS_CODE } from "./constants";
import { Logger } from "../../../logger";
import { ioc } from "../../../../ioc";
import { TinkoffV1Converter } from "./converter";

/**
 * Interface for Tinkoff Invest API
 * https://tinkoff.github.io/investAPI/swagger-ui/#/
 */
export class TinkoffV1Client {
	private readonly logger: Logger = ioc.resolve(Logger);
	private readonly converter: TinkoffV1Converter = ioc.resolve(TinkoffV1Converter);

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
		this.logger.trace(`Received from Tinkoff: ${JSON.stringify(response.data, null, 4)}`);
		return response.data;
	}

	async currencies(): Promise<{ instruments: ICurrency[] }> {
		const response = await axios({
			method: "POST",
			url: `${this.url}${this.instrumentsService}/Currencies`,
			headers: { authorization: this.jwt },
			data: {},
		});
		this.logger.trace(`Received from Tinkoff: ${JSON.stringify(response.data, null, 4)}`);
		return response.data;
	}

	async getInstrumentBy(data: GetInstrumentByRequest = {}): Promise<{ instrument: IMarketInstrument }> {
		const response = await axios({
			method: "POST",
			url: `${this.url}${this.instrumentsService}/GetInstrumentBy`,
			data: { ...data, classCode: DEFAULT_CLASS_CODE },
			headers: { authorization: this.jwt },
		});
		this.logger.trace(`Received from Tinkoff: ${JSON.stringify(response.data, null, 4)}`);
		return response.data;
	}

	async getDividends(data: GetDividendsRequest): Promise<void> {
		const response = await axios({
			method: "POST",
			url: `${this.url}${this.instrumentsService}/GetDividends`,
			data: data,
			headers: { authorization: this.jwt },
		});
		this.logger.trace(`Received from Tinkoff: ${JSON.stringify(response.data, null, 4)}`);
		return response.data;
	}

	async getPortfolio(accountId: string): Promise<GetPortfolioResponse> {
		const response = await axios({
			method: "POST",
			url: `${this.url}${this.operationsService}/GetPortfolio`,
			data: { accountId },
			headers: { authorization: this.jwt },
		});
		this.logger.trace(`Received from Tinkoff: ${JSON.stringify(response.data, null, 4)}`);
		return response.data;
	}

	async getAccounts(): Promise<{ accounts: IAccount[] }> {
		const response = await axios({
			method: "POST",
			url: `${this.url}${this.usersService}/GetAccounts`,
			data: {},
			headers: { authorization: this.jwt },
		});
		this.logger.trace(`Received from Tinkoff: ${JSON.stringify(response.data, null, 4)}`);
		return response.data;
	}

	/**
	 * By default, Tinkoff access token works only with single account
	 * Accessible account - is account with full access from all user's accounts
	 */
	async getAccessibleAccount(): Promise<IAccount | undefined> {
		const { accounts } = await this.getAccounts();
		return accounts.find((a) => a.accessLevel === AccountAccessLevel.FullAccess);
	}

	async getAccessibleAccountBalance(): Promise<Record<string, number>> {
		const account = await this.getAccessibleAccount();
		if (!account) {
			throw new Error(`No account with access`);
		}

		const portfolio = await this.getPortfolio(account.id);
		const portfolioCurrencies = portfolio.positions.filter((p) => p.instrumentType === "currency");
		const { instruments: availableCurrencies } = await this.currencies();

		const balance: Record<string, number> = {};
		for (const currency of portfolioCurrencies) {
			for (const availableCurrency of availableCurrencies) {
				if (currency.figi === availableCurrency.figi) {
					balance[availableCurrency.isoCurrencyName] = this.converter.convertNominal(currency.quantityLots);
					break;
				}
			}
		}
		balance["rub"] = this.converter.convertNominal(portfolio.totalAmountCurrencies);

		this.logger.debug(`Received from Tinkoff: ${JSON.stringify(balance, null, 4)}`);
		return balance;
	}

	async getCandles(data: GetCandlesRequest): Promise<{ candles: ICandle[] }> {
		const response = await axios({
			method: "POST",
			url: `${this.url}${this.marketDataService}/GetCandles`,
			data: { ...data },
			headers: { authorization: this.jwt },
		});

		this.logger.trace(`Received from Tinkoff: ${JSON.stringify(response.data, null, 4)}`);
		return response.data;
	}

	async buyAsset(data: PostOrderRequestParams): Promise<PostOrderResponse> {
		const response = await axios({
			method: "POST",
			url: `${this.url}${this.ordersService}/PostOrder`,
			data: { ...data },
			headers: { authorization: this.jwt },
		});

		this.logger.trace(`Received from Tinkoff: ${JSON.stringify(response.data, null, 4)}`);
		return response.data;
	}

	async getOrders(data: GetOrdersRequestParams): Promise<GetOrdersResponse> {
		const response = await axios({
			method: "POST",
			url: `${this.url}${this.ordersService}/GetOrders`,
			data: { ...data },
			headers: { authorization: this.jwt },
		});

		this.logger.trace(`Received from Tinkoff: ${JSON.stringify(response.data, null, 4)}`);
		return response.data;
	}
}

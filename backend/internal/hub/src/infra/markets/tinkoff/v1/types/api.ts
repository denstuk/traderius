import { CandleInterval, InstrumentIdentifierType, InstrumentStatus, OrderDirectionType, OrderType } from "./enums";
import { IAccount, INominal, IPortfolioPosition, IQuote, ITinkoffOrderState } from "./core";

export declare type GetSharesRequest = {
	instrumentStatus?: InstrumentStatus;
};

export declare type GetInstrumentByRequest = {
	idType?: InstrumentIdentifierType;
	classCode?: string;
	id?: string;
};

export declare type GetDividendsRequest = {
	figi: string;
	from: string;
	to: string;
};

export declare type GetPortfolioResponse = {
	totalAmountShares: INominal;
	totalAmountBonds: INominal;
	totalAmountEtf: INominal;
	totalAmountCurrencies: INominal;
	totalAmountFutures: INominal;
	expectedYield: IQuote;
	positions: IPortfolioPosition[];
};

export declare type GetAccountsResponse = {
	accounts: IAccount[];
};

export type GetCandlesRequest = {
	figi: string;
	from: string;
	to: string;
	interval: CandleInterval;
};

/* Orders Service */
/* PostOrder */

export type PostOrderRequestParams = {
	figi?: string;
	quantity?: string;
	price?: IQuote;
	direction?: OrderDirectionType;
	accountId?: string;
	orderType?: OrderType;
	orderId?: string;
};

export type PostOrderResponse = {
	orderId?: string;
	executionReportStatus: string;
	lotsRequested: string;
	lotsExecuted: string;
	initialOrderPrice: INominal;
	executedOrderPrice: INominal;
	totalOrderAmount: INominal;
	initialCommission: INominal;
	executedCommission: INominal;
	aciValue: INominal;
	figi: string;
	direction: OrderDirectionType;
	initialSecurityPrice: INominal;
	orderType: OrderType;
	message: string;
	initialOrderPricePt: INominal;
};

/* GetOrders */

export type GetOrdersRequestParams = {
	accountId: string;
};

export type GetOrdersResponse = {
	orders: ITinkoffOrderState[];
};

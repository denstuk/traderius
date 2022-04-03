import {
	CandleInterval,
	IAccount,
	INominal,
	InstrumentIdentifierType,
	InstrumentStatus,
	IPortfolioPosition,
	IQuote,
} from "./base.types";

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

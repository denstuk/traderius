import {
	AccountAccessLevel,
	AccountStatus,
	AccountType,
	CurrencyType,
	OrderDirectionType,
	ShareType,
	TinkoffOrderExecutionReportStatus,
	TradingStatus,
} from "./enums";

export interface IQuote {
	units: string;
	nano: number;
}

export interface INominal {
	units: string;
	nano: number;
	currency: string;
}

export interface IShare {
	figi: string;
	ticker: string;
	classCode: string;
	isin: string;
	lot: number;
	currency: CurrencyType;
	klong: IQuote;
	dlong: IQuote;
	dshort: IQuote;
	dlongMin: IQuote;
	dshortMin: IQuote;
	shortEnableFlag: boolean;
	name: string;
	exchange: string;
	ipoDate: string;
	issueSize: string;
	countryOfRisk: string;
	countryOrRiskName: string;
	sector: string;
	issueSizePlan: string;
	nominal: INominal;
	tradingStatus: TradingStatus;
	otcFlag: boolean;
	buyAvailableFlag: boolean;
	sellAvailableFlag: boolean;
	divYieldFlag: boolean;
	shareType: ShareType;
	minPriceIncrement: IQuote;
	apiTradeAvailableFlag: boolean;
}

export interface IMarketInstrument {
	figi: string;
	ticker: string;
	classCode: string;
	isin: string;
	lot: number;
	currency: CurrencyType;
	klong: IQuote;
	dlong: IQuote;
	dshort: IQuote;
	dlongMin: IQuote;
	dshortMin: IQuote;
	shortEnableFlag: boolean;
	name: string;
	exchange: string;
	countryOfRisk: string;
	countryOrRiskName: string;
	instrumentType: string;
	tradingStatus: TradingStatus;
	otcFlag: boolean;
	buyAvailableFlag: boolean;
	sellAvailableFlag: boolean;
	minPriceIncrement: IQuote;
	apiTradeAvailableFlag: boolean;
}

export interface IDividend {
	dividendNet: INominal;
	paymentDate: string;
	declaredDate: string;
	lastBuyDate: string;
	dividendType: string;
	recordDate: string;
	regularity: string;
	closePrice: INominal;
	yieldValue: IQuote;
	createdAt: string;
}

export interface ICurrency {
	figi: string;
	ticker: string;
	classCode: string;
	isin: string;
	lot: number;
	currency: string;
	isoCurrencyName: string;
}

export interface IPortfolioPosition {
	figi: string;
	instrumentType: string;
	quantity: IQuote;
	averagePositionPrice: INominal;
	expectedYield: INominal;
	currentNkd: INominal;
	averagePositionPricePt: INominal;
	currentPrice: INominal;
	averagePositionPriceFifo: INominal;
	quantityLots: INominal;
}

export interface IAccount {
	id: string;
	type: AccountType;
	name: string;
	status: AccountStatus;
	openedDate: string;
	closedDate: string;
	accessLevel: AccountAccessLevel;
}

export interface ICandle {
	open: IQuote;
	high: IQuote;
	low: IQuote;
	close: IQuote;
	volume: string;
	time: string;
	isComplete: boolean;
}

export interface ITinkoffOrderState {
	orderId: string;
	executionReportStatus: TinkoffOrderExecutionReportStatus;
	lotsRequested: string;
	lotsExecuted: string;
	initialOrderPrice: INominal;
	executedOrderPrice: INominal;
	totalOrderAmount: INominal;
	averagePositionPrice: INominal;
	initialCommission: INominal;
	executedCommission: INominal;
	figi: string;
	direction: OrderDirectionType;
	initialSecurityPrice: INominal;
	stages: Record<string, string>;
	serviceCommission: INominal;
	currency: string;
	orderType: string;
	orderDate: string;
}

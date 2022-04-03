export declare type CandleResolution =
	| "1min"
	| "2min"
	| "3min"
	| "5min"
	| "10min"
	| "15min"
	| "30min"
	| "hour"
	| "day"
	| "week"
	| "month";

export enum InstrumentStatus {
	InstrumentStatusUnspecified = "INSTRUMENT_STATUS_UNSPECIFIED",
	InstrumentStatusBase = "INSTRUMENT_STATUS_BASE",
	InstrumentStatusAll = "INSTRUMENT_STATUS_ALL",
}

export enum ShareType {
	ShareTypeUnspecified = "SHARE_TYPE_UNSPECIFIED",
	ShareTypeCommon = "SHARE_TYPE_COMMON",
	ShareTypePreferred = "SHARE_TYPE_PREFERRED",
	ShareTypeAdr = "SHARE_TYPE_ADR",
	ShareTypeGdr = "SHARE_TYPE_GDR",
	ShareTypeMlp = "SHARE_TYPE_MLP",
	ShareTypeNyRegShrs = "SHARE_TYPE_NY_REG_SHRS",
	ShareTypeClosedEndFund = "SHARE_TYPE_CLOSED_END_FUND",
	ShareTypeReit = "SHARE_TYPE_REIT",
}

export enum CurrencyType {
	Rub = "rub",
	Usd = "usd",
	Eur = "eur",
}

export enum TradingStatus {
	SecurityTradingStatusUnspecified = "SECURITY_TRADING_STATUS_UNSPECIFIED",
	SecurityTradingStatusNotAvailableForTrading = "SECURITY_TRADING_STATUS_NOT_AVAILABLE_FOR_TRADING",
	SecurityTradingStatusOpeningPeriod = "SECURITY_TRADING_STATUS_OPENING_PERIOD",
	SecurityTradingStatusClosingPeriod = "SECURITY_TRADING_STATUS_CLOSING_PERIOD",
	SecurityTradingStatusBreakInTrading = "SECURITY_TRADING_STATUS_BREAK_IN_TRADING",
	SecurityTradingStatusNormalTrading = "SECURITY_TRADING_STATUS_NORMAL_TRADING",
	SecurityTradingStatusClosingAuction = "SECURITY_TRADING_STATUS_CLOSING_AUCTION",
	SecurityTradingStatusDarkPoolAuction = "SECURITY_TRADING_STATUS_DARK_POOL_AUCTION",
	SecurityTradingStatusDiscreteAuction = "SECURITY_TRADING_STATUS_DISCRETE_AUCTION",
	SecurityTradingStatusOpeningAuctionPeriod = "SECURITY_TRADING_STATUS_OPENING_AUCTION_PERIOD",
	SecurityTradingStatusAtClosingAuctionPrice = "SECURITY_TRADING_STATUS_TRADING_AT_CLOSING_AUCTION_PRICE",
	SecurityTradingStatusSessionAssigned = "SECURITY_TRADING_STATUS_SESSION_ASSIGNED",
	SecurityTradingStatusSessionClose = "SECURITY_TRADING_STATUS_SESSION_CLOSE",
	SecurityTradingStatusSessionOpen = "SECURITY_TRADING_STATUS_SESSION_OPEN",
	SecurityTradingStatusDealerNormalTrading = "SECURITY_TRADING_STATUS_DEALER_NORMAL_TRADING",
	SecurityTradingStatusDealerBreakInTrading = "SECURITY_TRADING_STATUS_DEALER_BREAK_IN_TRADING",
	SecurityTradingStatusDealerNotAvailableForTrading = "SECURITY_TRADING_STATUS_DEALER_NOT_AVAILABLE_FOR_TRADING ",
}

export enum InstrumentIdentifierType {
	InstrumentIdUnspecified = "INSTRUMENT_ID_UNSPECIFIED",
	InstrumentIdTypeFigi = "INSTRUMENT_ID_TYPE_FIGI",
	InstrumentIdTypeTicker = "INSTRUMENT_ID_TYPE_TICKER",
}

export enum AccountType {
	Unspecified = "ACCOUNT_TYPE_UNSPECIFIED",
	Tinkoff = "ACCOUNT_TYPE_TINKOFF",
	TinkoffIIS = "ACCOUNT_TYPE_TINKOFF_IIS",
	InvestBox = "ACCOUNT_TYPE_INVEST_BOX",
}

export enum AccountStatus {
	Unspecified = "ACCOUNT_STATUS_UNSPECIFIED",
	New = "ACCOUNT_STATUS_NEW",
	Open = "ACCOUNT_STATUS_OPEN",
	Closed = "ACCOUNT_STATUS_CLOSED",
}

export enum AccountAccessLevel {
	Unspecified = "ACCOUNT_ACCESS_LEVEL_UNSPECIFIED",
	FullAccess = "ACCOUNT_ACCESS_LEVEL_FULL_ACCESS",
	ReadOnly = "ACCOUNT_ACCESS_LEVEL_READ_ONLY",
	NoAccess = "ACCOUNT_ACCESS_LEVEL_NO_ACCESS",
}

export enum CandleInterval {
	Unspecified = "CANDLE_INTERVAL_UNSPECIFIED",
	Min1 = "CANDLE_INTERVAL_1_MIN",
	Min5 = "CANDLE_INTERVAL_5_MIN",
	Min15 = "CANDLE_INTERVAL_15_MIN",
	Hour = "CANDLE_INTERVAL_HOUR",
	Day = "CANDLE_INTERVAL_DAY",
}

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

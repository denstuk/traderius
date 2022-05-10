export type CandleResolution =
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
	Unspecified = "INSTRUMENT_STATUS_UNSPECIFIED",
	Base = "INSTRUMENT_STATUS_BASE",
	All = "INSTRUMENT_STATUS_ALL",
}

export enum ShareType {
	Unspecified = "SHARE_TYPE_UNSPECIFIED",
	Common = "SHARE_TYPE_COMMON",
	Preferred = "SHARE_TYPE_PREFERRED",
	Adr = "SHARE_TYPE_ADR",
	Gdr = "SHARE_TYPE_GDR",
	Mlp = "SHARE_TYPE_MLP",
	NyRegShrs = "SHARE_TYPE_NY_REG_SHRS",
	ClosedEndFund = "SHARE_TYPE_CLOSED_END_FUND",
	Reit = "SHARE_TYPE_REIT",
}

export enum CurrencyType {
	Rub = "rub",
	Usd = "usd",
	Eur = "eur",
}

export enum TradingStatus {
	Unspecified = "SECURITY_TRADING_STATUS_UNSPECIFIED",
	NotAvailableForTrading = "SECURITY_TRADING_STATUS_NOT_AVAILABLE_FOR_TRADING",
	OpeningPeriod = "SECURITY_TRADING_STATUS_OPENING_PERIOD",
	ClosingPeriod = "SECURITY_TRADING_STATUS_CLOSING_PERIOD",
	BreakInTrading = "SECURITY_TRADING_STATUS_BREAK_IN_TRADING",
	NormalTrading = "SECURITY_TRADING_STATUS_NORMAL_TRADING",
	ClosingAuction = "SECURITY_TRADING_STATUS_CLOSING_AUCTION",
	DarkPoolAuction = "SECURITY_TRADING_STATUS_DARK_POOL_AUCTION",
	DiscreteAuction = "SECURITY_TRADING_STATUS_DISCRETE_AUCTION",
	OpeningAuctionPeriod = "SECURITY_TRADING_STATUS_OPENING_AUCTION_PERIOD",
	AtClosingAuctionPrice = "SECURITY_TRADING_STATUS_TRADING_AT_CLOSING_AUCTION_PRICE",
	SessionAssigned = "SECURITY_TRADING_STATUS_SESSION_ASSIGNED",
	SessionClose = "SECURITY_TRADING_STATUS_SESSION_CLOSE",
	SessionOpen = "SECURITY_TRADING_STATUS_SESSION_OPEN",
	DealerNormalTrading = "SECURITY_TRADING_STATUS_DEALER_NORMAL_TRADING",
	DealerBreakInTrading = "SECURITY_TRADING_STATUS_DEALER_BREAK_IN_TRADING",
	DealerNotAvailableForTrading = "SECURITY_TRADING_STATUS_DEALER_NOT_AVAILABLE_FOR_TRADING ",
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

export enum OrderDirectionType {
	Unspecified = "ORDER_DIRECTION_UNSPECIFIED",
	Buy = "ORDER_DIRECTION_BUY",
	Sell = "ORDER_DIRECTION_SELL ",
}

export enum OrderType {
	Unspecified = "ORDER_TYPE_UNSPECIFIED",
	Limit = "ORDER_TYPE_LIMIT",
	Market = "ORDER_TYPE_MARKET ",
}

export const enum TinkoffOrderExecutionReportStatus {
	Unspecified = "EXECUTION_REPORT_STATUS_UNSPECIFIED",
	Fill = "EXECUTION_REPORT_STATUS_FILL",
	Rejected = "EXECUTION_REPORT_STATUS_REJECTED",
	Canceled = "EXECUTION_REPORT_STATUS_CANCELLED",
	New = "EXECUTION_REPORT_STATUS_NEW",
	PartialFill = "EXECUTION_REPORT_STATUS_PARTIALLYFILL",
}

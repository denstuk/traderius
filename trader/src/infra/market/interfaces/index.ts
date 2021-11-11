export enum InstrumentType {
	Stock = 'Stock',
	Currency = 'Currency',
	Bond = 'Bond',
	Etf = 'Etf'
}

export enum Currency {
	RUB = 'RUB',
	USD = "USD",
	EUR = "EUR",
	GBP = "GBP",
	HKD = "HKD",
	CHF = "CHF",
	JPY = "JPY",
	CNY = "CNY",
	TRY = "TRY"
}

export interface MarketInstrument {
	figi: string
	ticker: string
	isin?: string
	minPriceIncrement?: number
	lot: number
	minQuantity?: number
	currency?: Currency
	name: string
	type: InstrumentType
}

export interface PortfolioPosition {
	figi: string
	ticker?: string
	isin?: string
	instrumentType: InstrumentType
	balance: number
	blocked?: number
	lots: number
	name: string
}

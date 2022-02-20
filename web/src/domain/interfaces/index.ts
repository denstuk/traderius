export enum UserStrategy {
    None = 1,
    Automated
}

export interface INews {
    id: string;
    title: string;
    link: string;
    pubDate: string;
    source: string;
}

export interface IUser {
    id: string;
    login: string;
    email: string;
    notificationEnabled: boolean;
    automatedTradingEnabled: boolean;
    strategy: UserStrategy;
    tinkoffMarketTokenConnected: boolean;
}

export interface IAnalysis {
    points: PricePoint[];
    regressions: { linear: PricePoint; polynomial: PricePoint; };
    lstm: { lstm30: number, lstm7: number };
}

export interface IBalance {
    usd: number;
    eur: number;
    rub: number;
}

export interface ICandle {
    o: number;
    c: number;
    h: number;
    l: number;
    v: number;
    time: Date;
    interval: string;
    figi: string;
}

export declare type Currencies = {
    currencies: CurrencyPosition[];
};

export declare type CurrencyPosition = {
    currency: Currency;
    balance: number;
    blocked?: number;
};

export declare type Currency = "RUB" | "USD" | "EUR" | "GBP" | "HKD" | "CHF" | "JPY" | "CNY" | "TRY";
export declare type InstrumentType = "Stock" | "Currency" | "Bond" | "Etf";
export declare type Index = number;
export declare type Price = number;
export declare type PricePoint = [Index, Price];

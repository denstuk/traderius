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

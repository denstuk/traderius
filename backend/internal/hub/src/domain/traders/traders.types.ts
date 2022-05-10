import { UserEntity } from "../users/entities/user.entity";

export enum CurrencyType {
	Rub = "rub",
	Usd = "usd",
	Eur = "eur",
}

export interface ITraderService {
	trade(params: unknown, user: UserEntity): Promise<void>;
}

export interface IBalance {
	[CurrencyType.Rub]: number | undefined;
	[CurrencyType.Usd]: number | undefined;
	[CurrencyType.Eur]: number | undefined;
	[key: string]: number | undefined /* Unsupported currencies */;
}

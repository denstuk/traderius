export enum UserStrategy {
	None = 1,
	Automated,
}

export interface IUpdateUser {
	tinkoffMarketToken?: string;
	login?: string;
	strategy?: UserStrategy;
}

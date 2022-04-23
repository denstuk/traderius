export interface UpdateUserData {
	email?: string;
	login?: string;
}

export interface IUserBalanceResponse {
	rub: number;
	eur?: number;
	usd?: number;
}

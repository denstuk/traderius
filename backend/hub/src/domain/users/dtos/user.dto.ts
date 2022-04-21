import { UserStrategy } from "../users.types";

export class UserDto {
	id!: string;
	login!: string;
	email!: string;
	strategy!: UserStrategy;
	notificationEnabled!: boolean;
	automatedTradingEnabled!: boolean;
	tinkoffMarketTokenConnected!: boolean;
}

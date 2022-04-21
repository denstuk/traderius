import {UserEntity} from "../../src/domain/users/entities/user.entity";
import {UserStrategy} from "../../src/domain/users/users.types";

export const TestUser1Data: Partial<UserEntity> = {
	login: "testUser1",
	email: "testUser1@example.com",
	password: "password",
	salt: "salt",
	strategy: UserStrategy.None,
	tinkoffMarketToken: "test",
	notificationEnabled: true,
	automatedTradingEnabled: false,
};

export const TestUser2Data: Partial<UserEntity> = {
	login: "testUser2",
	email: "testUser2@example.com",
	password: "password2",
	salt: "salt2",
	strategy: UserStrategy.Automated,
	tinkoffMarketToken: undefined,
	notificationEnabled: true,
	automatedTradingEnabled: false,
};

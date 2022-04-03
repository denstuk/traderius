import { inject, injectable } from "inversify";
import { UserService } from "../../../../../domain/users/user.service";
import { UpdateStrategyDto } from "./dtos/update-strategy.dto";
import { UserEntity } from "../../../../../domain/users/entities/user.entity";
import { UpdateNotificationsEnabledDto } from "./dtos/update-notifications-enabled.dto";
import { UpdateTinkoffMarketTokenDto } from "./dtos/update-tinkoff-market-token.dto";
import { UpdateAutomatedTradingEnabledDto } from "./dtos/update-automated-trading-enabled.dto";
import { TinkoffMarket } from "../../../../../infra";
import { HttpError } from "../../../core/http.error";
import { HttpStatus } from "../../../core/http-status.enum";
import { Currencies } from "@tinkoff/invest-openapi-js-sdk";
import { UserDto } from "../../../../../domain/users/dtos/user.dto";
import { UpdateUserDto } from "./dtos/update-user.dto";
import { UserMapper } from "../../../../../domain/users/user.mapper";

@injectable()
export class UsersController {
	constructor(
		@inject(UserService) private userService: UserService,
		@inject(UserMapper) private userMapper: UserMapper
	) {}

	async updateStrategy(data: UpdateStrategyDto, user: UserEntity): Promise<void> {
		user.strategy = data.automatedTradingEnabled;
		await this.userService.save(user);
	}

	async updateNotificationsEnabled(data: UpdateNotificationsEnabledDto, user: UserEntity): Promise<void> {
		user.notificationEnabled = data.notificationEnabled;
		await this.userService.save(user);
	}

	async updateAutomatedTradingEnabled(data: UpdateAutomatedTradingEnabledDto, user: UserEntity): Promise<void> {
		user.automatedTradingEnabled = data.automatedTradingEnabled;
		await this.userService.save(user);
	}

	async updateTinkoffMarketToken(data: UpdateTinkoffMarketTokenDto, user: UserEntity): Promise<void> {
		user.tinkoffMarketToken = data.tinkoffMarketToken;
		await this.userService.save(user);
	}

	async getTinkoffBalance(user: UserEntity): Promise<Currencies> {
		if (!user.tinkoffMarketToken) throw new HttpError(HttpStatus.Forbidden, "Tinkoff market not connected");
		const market = new TinkoffMarket(user.tinkoffMarketToken);
		return await market.balance();
	}

	async updateUser(data: UpdateUserDto, user: UserEntity): Promise<UserDto> {
		if (data.email && user.email !== data.email) {
			const existedUser = await this.userService.getByCredential(data.email, undefined);
			if (existedUser) throw new HttpError(HttpStatus.Conflict, "Email or login already taken");
		}
		if (data.login && user.login !== data.login) {
			const existedUser = await this.userService.getByCredential(undefined, data.login);
			if (existedUser) throw new HttpError(HttpStatus.Conflict, "Email or login already taken");
		}

		const afterUpdate = await this.userService.update(user.id, data);
		return this.userMapper.mapToDto(afterUpdate);
	}
}

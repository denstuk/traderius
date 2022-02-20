import {inject, injectable} from "inversify";
import {UserService} from "../../../domain/users/services/user.service";
import {UpdateStrategyDto} from "../dtos/users/update-strategy.dto";
import {UserEntity} from "../../../domain/users/entities/user.entity";
import {UpdateNotificationsEnabledDto} from "../dtos/users/update-notifications-enabled.dto";
import {UpdateTinkoffMarketTokenDto} from "../dtos/users/update-tinkoff-market-token.dto";
import {UpdateAutomatedTradingEnabledDto} from "../dtos/users/update-automated-trading-enabled.dto";
import {TinkoffMarket} from "../../../infra";
import {HttpError} from "../core/http.error";
import {HttpStatus} from "../core/http-status.enum";
import {Currencies} from "@tinkoff/invest-openapi-js-sdk";

@injectable()
export class UsersController {
	constructor(@inject(UserService) private userService: UserService) {}

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
}

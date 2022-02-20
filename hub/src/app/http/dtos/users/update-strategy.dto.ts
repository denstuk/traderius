import { IsDefined, IsEnum } from "class-validator";
import { UserStrategy } from "../../../../domain/users/users.types";

export class UpdateStrategyDto {
	@IsDefined()
	@IsEnum(UserStrategy)
	automatedTradingEnabled!: UserStrategy;
}

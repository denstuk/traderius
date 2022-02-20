import { IsBoolean, IsDefined } from "class-validator";

export class UpdateAutomatedTradingEnabledDto {
	@IsDefined()
	@IsBoolean()
	automatedTradingEnabled!: boolean;
}

import { IsDefined, IsString } from "class-validator";

export class UpdateTinkoffMarketTokenDto {
	@IsDefined()
	@IsString()
	tinkoffMarketToken!: string;
}

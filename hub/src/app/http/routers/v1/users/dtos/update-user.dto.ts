import { IsEmail, IsString } from "class-validator";

export class UpdateUserDto {
	@IsString()
	login?: string;

	@IsString()
	@IsEmail()
	email?: string;
}

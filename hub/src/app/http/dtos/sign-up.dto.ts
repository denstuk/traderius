import { IsDefined, IsString } from "class-validator";

export class SignUpDto {
	@IsDefined()
	@IsString()
	login!: string;

	@IsDefined()
	@IsString()
	email!: string;

	@IsDefined()
	@IsString()
	password!: string;
}

import { ApiProperty } from "@nestjs/swagger";

export class SignInDto {
	@ApiProperty({
		description: "Email or login",
		type: String,
		required: true,
	})
	readonly credential: string;

	@ApiProperty({
		description: "Password",
		type: String,
		required: true,
	})
	readonly password: string;
}

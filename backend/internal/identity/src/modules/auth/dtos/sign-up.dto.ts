import { ApiProperty } from "@nestjs/swagger";

export class SignUpDto {
	@ApiProperty({
		description: "Login",
		type: String,
		required: true,
	})
	readonly login: string;

	@ApiProperty({
		description: "Email",
		type: String,
		required: true,
	})
	readonly email: string;

	@ApiProperty({
		description: "Phone number",
		type: String,
		required: true,
	})
	readonly phone: string;

	@ApiProperty({
		description: "Password",
		type: String,
		required: true,
	})
	readonly password: string;
}

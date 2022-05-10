import { ApiProperty } from "@nestjs/swagger";

export class TokenPairDto {
	@ApiProperty({
		description: "Access token",
		type: String,
		required: true,
	})
	readonly access: string;

	@ApiProperty({
		description: "Refresh token",
		type: String,
		required: true,
	})
	readonly refresh: string;
}

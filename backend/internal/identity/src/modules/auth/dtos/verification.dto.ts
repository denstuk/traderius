import { ApiProperty } from "@nestjs/swagger";

export class VerificationDto {
	@ApiProperty({
		description: "Verification status",
		type: String,
		required: true,
	})
	readonly ok: boolean;
}

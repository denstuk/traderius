import { IsBoolean, IsDefined } from "class-validator";

export class UpdateNotificationsEnabledDto {
	@IsDefined()
	@IsBoolean()
	notificationEnabled!: boolean;
}

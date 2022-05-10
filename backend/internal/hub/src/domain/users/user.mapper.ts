import { injectable } from "inversify";
import { UserDto } from "./dtos/user.dto";
import { UserEntity } from "./entities/user.entity";

@injectable()
export class UserMapper {
	mapToDto(userEntity: UserEntity): UserDto {
		const dto = new UserDto();
		dto.id = userEntity.id;
		dto.login = userEntity.login;
		dto.email = userEntity.email;
		dto.automatedTradingEnabled = userEntity.automatedTradingEnabled;
		dto.notificationEnabled = userEntity.notificationEnabled;
		dto.strategy = userEntity.strategy;
		dto.tinkoffMarketTokenConnected = !!userEntity.tinkoffMarketToken;
		return dto;
	}
}

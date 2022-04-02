import { UserEntity } from "../../../../domain/users/entities/user.entity";

declare global {
	namespace Express {
		interface Request {
			user: UserEntity;
		}
	}
}

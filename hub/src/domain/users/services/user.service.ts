import { injectable } from "inversify";
import { getRepository } from "typeorm";
import { UserEntity } from "../entities/user.entity";
import {UserStrategy} from "../users.types";

@injectable()
export class UserService {
	private readonly userRepo = getRepository(UserEntity);

	create(data: Partial<UserEntity>): Promise<UserEntity> {
		return this.userRepo.create({ ...data }).save();
	}

	getById(id: string): Promise<UserEntity | undefined> {
		return this.userRepo.findOne({ where: { id } });
	}

	getByCredential(email?: string, login?: string): Promise<UserEntity | undefined> {
		return this.userRepo.findOne({ where: [{ login }, { email }] });
	}

	getUsersWithStrategy(strategies: UserStrategy[]): Promise<UserEntity[]> {
		const sql = this.userRepo.createQueryBuilder('user');
		sql.andWhere("user.strategy in (:...strategies)", { strategies });
		return sql.getMany();
	}

	async save(entity: UserEntity): Promise<UserEntity> {
		return this.userRepo.save(entity);
	}
}

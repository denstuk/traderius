import { Injectable } from "@nestjs/common";
import { FindUserParams } from "./users.types";
import { Repository, SelectQueryBuilder } from "typeorm";
import { UserEntity } from "./entities/user.entity";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class UsersService {
	constructor(@InjectRepository(UserEntity) private readonly userRepo: Repository<UserEntity>) {}

	find(searchParams: FindUserParams): Promise<UserEntity[]> {
		return this.qb(searchParams).getMany();
	}

	findOne(searchParams: FindUserParams): Promise<UserEntity | undefined> {
		return this.qb(searchParams).getOne();
	}

	save(entity: UserEntity): Promise<UserEntity>;
	save(entities: UserEntity[]): Promise<UserEntity[]>;
	save(entityOrEntities: UserEntity | UserEntity[]): Promise<UserEntity | UserEntity[]> {
		return this.userRepo.save(entityOrEntities as UserEntity);
	}

	qb(params: FindUserParams = {}, alias = "user"): SelectQueryBuilder<UserEntity> {
		const query = this.userRepo.createQueryBuilder(alias);

		if (params.logins?.length) {
			query.andWhere(`${alias}.logins in (:...logins)`, { logins: params.logins });
		}
		if (params.emails?.length) {
			query.andWhere(`${alias}.emails in (:...emails)`, { emails: params.emails });
		}
		if (params.phones?.length) {
			query.andWhere(`${alias}.phones in (:...phones)`, { phones: params.phones });
		}
		if (params.roles?.length) {
			query.andWhere(`${alias}.roles in (:...roles)`, { roles: params.roles });
		}

		return query;
	}
}

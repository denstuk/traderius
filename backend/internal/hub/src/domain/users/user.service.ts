import { injectable } from "inversify";
import { Brackets, getRepository, SelectQueryBuilder } from "typeorm";
import { UserEntity } from "./entities/user.entity";
import { IFindUsersParams } from "./users.types";
import { NotFoundException } from "../core/exceptions/not-found.exception";

@injectable()
export class UserService {
	private readonly userRepo = getRepository(UserEntity);

	find(params: IFindUsersParams): Promise<UserEntity[]> {
		return this.qb(params).getMany();
	}

	findOne(params: IFindUsersParams): Promise<UserEntity | undefined> {
		return this.qb(params).getOne();
	}

	findByCredential(email?: string, login?: string): Promise<UserEntity | undefined> {
		return this.userRepo.findOne({ where: [{ login }, { email }] });
	}

	create(data: Partial<UserEntity>): Promise<UserEntity> {
		const user = this.userRepo.create({ ...data });
		return this.save(user);
	}

	save(entity: UserEntity): Promise<UserEntity> {
		return this.userRepo.save(entity);
	}

	async update(id: string, dto: Partial<UserEntity>): Promise<UserEntity> {
		let user = (await this.findOne({ ids: [id] })) as any;
		if (!user) {
			throw new NotFoundException(`user with id '${id}' not found`);
		}

		for (const key of Object.keys(dto)) {
			user[key] = dto[key as keyof UserEntity];
		}
		await this.userRepo.save(user as UserEntity);
		return user;
	}

	private qb(params: IFindUsersParams, alias = "user"): SelectQueryBuilder<UserEntity> {
		const query = this.userRepo.createQueryBuilder(alias);
		if (params.ids && params.ids.length) {
			query.andWhere(`${alias}.id in (:...ids)`, { ids: params.ids });
		}
		if (params.strategies && params.strategies.length) {
			query.andWhere(`${alias}.strategy in (:...strategies)`, { strategies: params.strategies });
		}
		if (params.credential) {
			query.andWhere(
				new Brackets((qb) => {
					qb.andWhere(`${alias}.login = :credential OR ${alias}.email = :credential`, {
						credential: params.credential,
					});
				})
			);
		}
		return query;
	}
}

import { injectable } from "inversify";
import { getRepository } from "typeorm";
import { UserEntity } from "../entities/user.entity";

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
        return this.userRepo.findOne({ where: [{ login }, { email }] })
    }
}

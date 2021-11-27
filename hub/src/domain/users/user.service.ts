import { injectable } from "inversify";
import { getRepository, Repository } from "typeorm";
import { UserEntity } from "./user.entity";

@injectable()
export class UserService {
    private readonly userRepo: Repository<UserEntity> = getRepository(UserEntity);
    
    getById(id: string): Promise<UserEntity | undefined> {
        return this.userRepo.findOne({ where: { id } });
    }
}

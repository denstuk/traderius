import { inject, injectable } from "inversify";
import { getRepository, Repository } from "typeorm";
import { PasswordService } from "../../shared/password.service";
import { TokenService } from "../../shared/token.service";
import { UserEntity } from "../user.entity";
import { ISignInData, ISignUpData } from "./auth.types";

@injectable()
export class AuthService {
    private readonly userRepo: Repository<UserEntity> = getRepository(UserEntity);
    constructor(
        @inject(TokenService) private tokenService: TokenService,
        @inject(PasswordService) private passwordService: PasswordService,
    ) {}

    async signUp({ email, login, password }: ISignUpData): Promise<string> {
        const existedUser = await this.userRepo.findOne({ where: [{ email }, { login }] });
        if (existedUser) {
            throw new Error("User already exist");
        }

        const hashedPassword = this.passwordService.createHash(password);
        const user = this.userRepo.create({ email, login, password: hashedPassword });
        await user.save();

        return this.tokenService.generate({ id: user.id });
    }

    async signIn({ credential, password }: ISignInData): Promise<string> {
        const user = await this.userRepo.findOne({ where: [{ email: credential }, { login: credential }] });
        if (!user) {
            throw new Error("Invalid credentials or password");
        }

        const isPasswordCorrect = this.passwordService.compareHashes(password, user.password);
        if (!isPasswordCorrect) {
            throw new Error("Incorrect password");
        }

        return this.tokenService.generate({ id: user.id });
    }
}

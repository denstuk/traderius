import { inject, injectable } from "inversify";
import { PasswordService } from "../../../../../domain/auth/password.service";
import { TokenService } from "../../../../../domain/auth/token.service";
import { UserService } from "../../../../../domain/users/user.service";
import { HttpStatus } from "../../../core/http-status.enum";
import { HttpError } from "../../../core/http.error";
import { SignInDto } from "./dtos/sign-in.dto";
import { SignUpDto } from "./dtos/sign-up.dto";

@injectable()
export class AuthController {
	constructor(
		@inject(UserService) private userService: UserService,
		@inject(TokenService) private tokenService: TokenService,
		@inject(PasswordService) private passwordService: PasswordService
	) {}

	async signUp({ login, email, password }: SignUpDto): Promise<string> {
		const existedUser = await this.userService.findByCredential(email, login);
		if (existedUser) {
			throw new HttpError(HttpStatus.Conflict, "user with such email or login already exists");
		}

		const hashResult = this.passwordService.createHash(password);
		const user = await this.userService.create({
			email,
			login,
			password: hashResult.password,
			salt: hashResult.salt,
		});

		return this.tokenService.generate({ id: user.id });
	}

	async signIn({ credential, password }: SignInDto): Promise<string> {
		const user = await this.userService.findOne({ credential });
		if (!user) {
			throw new Error("Invalid credential or password");
		}

		const isPasswordCorrect = this.passwordService.compareHashes(password, user.salt, user.password);
		if (!isPasswordCorrect) {
			throw new Error("Incorrect password");
		}

		return this.tokenService.generate({ id: user.id });
	}
}

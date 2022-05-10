import { Injectable } from "@nestjs/common";
import { CryptoService } from "./services/crypto.service";
import { JwtService } from "./services/jwt.service";
import { UsersService } from "../users/users.service";
import { TokenPairDto } from "./dtos/token-pair.dto";
import { SignUpDto } from "./dtos/sign-up.dto";
import { UserEntity } from "../users/entities/user.entity";
import { SignInDto } from "./dtos/sign-in.dto";
import { VerificationDto } from "./dtos/verification.dto";

@Injectable()
export class AuthService {
	constructor(
		private readonly cryptoService: CryptoService,
		private readonly jwtService: JwtService,
		private readonly usersService: UsersService
	) {}

	async signUp(dto: SignUpDto): Promise<TokenPairDto> {
		const usersQb = this.usersService.qb({}, "user");
		usersQb.orWhere("user.email = :email", { email: dto.email });
		usersQb.orWhere("user.phone = :phone", { phone: dto.phone });
		usersQb.orWhere("user.login = :login", { login: dto.login });

		const existingUser = await usersQb.getOne();
		if (existingUser) {
			throw new Error(`Error: user with such email, phone or login already exists`);
		}

		const hashPair = await this.cryptoService.generateHashSaltPairFrom(dto.password);

		const user = new UserEntity();
		user.login = dto.login;
		user.email = dto.email;
		user.phone = dto.phone;
		user.password = hashPair.hash;
		user.passwordSalt = hashPair.salt;
		await this.usersService.save(user);

		return this.jwtService.generateTokenPairFrom(user);
	}

	async signIn(dto: SignInDto): Promise<TokenPairDto> {
		const usersQb = this.usersService.qb({}, "user");
		usersQb.orWhere("user.email = :email", { email: dto.credential });
		usersQb.orWhere("user.login = :login", { login: dto.credential });

		const user = await usersQb.getOne();
		if (!user) {
			throw new Error(`Error: user with such email or login not exists`);
		}

		return this.jwtService.generateTokenPairFrom(user);
	}

	async verify(authorizationHeader: string | undefined): Promise<VerificationDto> {
		if (!authorizationHeader) return { ok: false };

		const token = authorizationHeader.split(" ")[1];
		if (!token) return { ok: false };

		return { ok: this.jwtService.verifyAccess(token) };
	}

	async refresh(refreshToken: string, authorizationHeader: string | undefined): Promise<TokenPairDto> {
		if (!authorizationHeader) throw new Error("Missing authorization header");
		if (!this.jwtService.verifyRefresh(refreshToken)) throw new Error("Invalid refresh token");

		const token = authorizationHeader.split(" ")[1];
		if (!token) throw new Error("Missing refresh token");

		const payload: { id: string } = this.jwtService.extractPayload(token);
		const user = await this.usersService.findOne({ ids: [payload.id] });

		return this.jwtService.generateTokenPairFrom(user);
	}
}

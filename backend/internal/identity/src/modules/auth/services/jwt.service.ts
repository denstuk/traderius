import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { SignOptions, VerifyOptions } from "jsonwebtoken";
import { ITokenPair } from "../auth.types";
import { UserEntity } from "../../users/entities/user.entity";
import * as jwt from "jsonwebtoken";

@Injectable()
export class JwtService {
	constructor(private readonly config: ConfigService) {}

	generateTokenPairFrom(user: UserEntity): ITokenPair {
		const payload: Record<string, unknown> = { id: user.id };

		const accessOptions = this.getSignOptions(+this.config.get("JWT_EXP_ACCESS"));
		const access = jwt.sign(payload, this.config.get("JWT_ACCESS_SECRET"), accessOptions);

		const refreshOptions = this.getSignOptions(+this.config.get("JWT_EXP_REFRESH"));
		const refresh = jwt.sign(payload, this.config.get("JWT_REFRESH_SECRET"), refreshOptions);

		return { access, refresh };
	}

	verifyAccess(token: string): boolean {
		const options = this.getVerifyOptions();
		try {
			jwt.verify(token, this.config.get("JWT_ACCESS_SECRET"), options);
			return true;
		} catch (err) {
			return false;
		}
	}

	verifyRefresh(token: string): boolean {
		const options = this.getVerifyOptions();
		try {
			jwt.verify(token, this.config.get("JWT_REFRESH_SECRET"), options);
			return true;
		} catch (err) {
			return false;
		}
	}

	extractPayload<T>(token: string): T {
		const options = this.getVerifyOptions();
		return jwt.verify(token, this.config.get("JWT_ACCESS_SECRET"), options) as T;
	}

	private getSignOptions(expTime: number): SignOptions {
		const options: SignOptions = {};
		options.issuer = this.config.get("JWT_ISS");
		options.audience = this.config.get("JWT_ISS");
		options.algorithm = this.config.get("JWT_ALG");
		options.expiresIn = `${expTime}s`;
		return options;
	}

	private getVerifyOptions(): VerifyOptions {
		const options: VerifyOptions = {};
		options.issuer = this.config.get("JWT_ISS");
		options.audience = this.config.get("JWT_ISS");
		options.algorithms = this.config.get("JWT_ALG");
		return options;
	}
}

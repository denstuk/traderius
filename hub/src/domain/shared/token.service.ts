import { injectable } from "inversify";
import jwt from "jsonwebtoken";
import { Configuration } from "../../infra";

@injectable()
export class TokenService {
	generate(payload: Record<string, unknown>): string {
		return jwt.sign(JSON.stringify(payload), Configuration.get<string>("Secret"));
	}

	verify<T>(token: string): T {
		return jwt.verify(token, Configuration.get<string>("Secret")) as T;
	}
}

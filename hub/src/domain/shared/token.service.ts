import { injectable } from "inversify";
import jwt from 'jsonwebtoken';
import { Config } from "../../infra/config";

@injectable()
export class TokenService {
    generate(payload: Record<string, unknown>): string {
        const token = jwt.sign(JSON.stringify(payload), Config.get<string>("Secret"));
        return token;
    }

    verify<T>(token: string): T {
        const payload = jwt.verify(token, Config.get<string>("Secret")) as string;
        return JSON.parse(payload) as T;
    }
}

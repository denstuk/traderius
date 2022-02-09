import * as crypto from "crypto";
import { injectable } from "inversify";

@injectable()
export class PasswordService {
	createHash(fromValue: string): { salt: string, password: string } {
		const salt = crypto.randomBytes(16).toString("hex");
		const password = crypto.scryptSync(fromValue, salt, 64).toString("hex");
		return { salt, password };
	}

    compareHashes(value: string, salt: string, hash: string): boolean {
        const hashedBuffer = crypto.scryptSync(value, salt, 64);
        const keyBuffer = Buffer.from(hash, "hex");
        return crypto.timingSafeEqual(hashedBuffer, keyBuffer);
    }
}

import crypto from "crypto";
import { injectable } from "inversify";
import { HashResult } from "./hash.types";

@injectable()
export class HashService {
	generateSalt(): string {
		return crypto.randomBytes(16).toString("hex");
	}

	generate(value: string): HashResult {
		const salt = crypto.randomBytes(16).toString("hex");
		const hash = crypto.scryptSync(value, salt, 64).toString("hex");
		return { salt, hash };
	}

	trySame(value: string, hash: string, salt: string): boolean {
		const hashedBuffer = crypto.scryptSync(hash, salt, 64);
		const keyBuffer = Buffer.from(value, "hex");
		return crypto.timingSafeEqual(hashedBuffer, keyBuffer);
	}
}

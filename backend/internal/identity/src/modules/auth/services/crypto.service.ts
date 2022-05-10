import * as crypto from "crypto";
import { Injectable } from "@nestjs/common";
import { IHashSaltPair } from "../auth.types";

@Injectable()
export class CryptoService {
	async generateHashSaltPairFrom(value: string): Promise<IHashSaltPair> {
		const salt = crypto.randomBytes(64).toString("hex");
		const hash = crypto.scryptSync(value, salt, 64).toString("hex");
		return { salt, hash };
	}

	async trySameHash(value: string, pair: IHashSaltPair): Promise<boolean> {
		const hashedValue = crypto.scryptSync(value, pair.salt, 64);
		const keyBuffer = Buffer.from(pair.hash, "hex");
		return crypto.timingSafeEqual(hashedValue, keyBuffer);
	}
}

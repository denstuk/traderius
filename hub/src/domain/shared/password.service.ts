import * as crypto from "crypto";
import { injectable } from "inversify";

@injectable()
export class PasswordService {
    createHash(fromValue: string): string {
        const salt = crypto.randomBytes(16).toString("hex");
        const hash = crypto.scryptSync(fromValue, salt, 64).toString("hex");
        return `${salt}:HTR:${hash}`;
    }

    compareHashes(value: string, hash: string): boolean {
        if (!hash.includes(":HTR:")) {
            return false;
        }
        const [salt, key] = hash.split(":HTR:");
        const hashedBuffer = crypto.scryptSync(value, salt, 64);

        const keyBuffer = Buffer.from(key, "hex");
        return crypto.timingSafeEqual(hashedBuffer, keyBuffer);
    }
}

import * as dotenv from "dotenv";

export class BaseConfig {
    static loadEnv(): void {
        dotenv.config();
    }

    protected static getEnvVar(key: string): string {
        const envVar = process.env[key];
        if (!envVar) {
            throw new Error(`Config: missing env variable ${key}`);
        }
        return envVar;
    }
}

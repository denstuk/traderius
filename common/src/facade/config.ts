import * as dotenv from "dotenv";

export class BaseConfig {
    private static loaded = false;

    static loadEnv(): void {
        dotenv.config();
    }

    protected static getEnvVar(key: string): string {
        if (!BaseConfig.loaded) {
            BaseConfig.loadEnv();
            BaseConfig.loaded = true;
        }

        const envVar = process.env[key];
        if (!envVar) {
            throw new Error(`Config: missing env variable ${key}`);
        }

        return envVar;
    }
}

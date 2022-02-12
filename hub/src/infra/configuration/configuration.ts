import dotenv from "dotenv";
import type { IConfiguration } from "./configuration.interface";
dotenv.config();

export class Configuration {
	static get<T extends string | number>(key: keyof IConfiguration): T {
		return this.configVars[key] as T;
	}

	private static getEnvVar(key: string): string {
		if (process.env[key] === undefined) throw new Error(`Config: missing environment variable ${key}`);
		return process.env[key]!;
	}

	private static configVars: IConfiguration = {
		Env: this.getEnvVar("ENV"),
		RedisHost: this.getEnvVar("REDIS_HOST"),
		RedisPort: Number(this.getEnvVar("REDIS_PORT")),
		RedisPass: this.getEnvVar("REDIS_PASS"),
		ServiceId: this.getEnvVar("SERVICE_ID"),
		NewsRapidHost: this.getEnvVar("NEWS_RAPID_HOST"),
		NewsRapidKey: this.getEnvVar("NEWS_RAPID_KEY"),
		Secret: this.getEnvVar("SECRET"),
		Port: Number(this.getEnvVar("PORT")),
		Host: this.getEnvVar("HOST"),
		TinkoffApiUrl: this.getEnvVar("TINKOFF_API_URL"),
		TinkoffWsUrl: this.getEnvVar("TINKOFF_WS_URL"),
		TinkoffSharedToken: this.getEnvVar("TINKOFF_SHARED_TOKEN"),
	};
}

import path from "path";
import dotenv from "dotenv";
import type { IConfiguration } from "./configuration.interface";

const root = path.join(__dirname, "../../../");
if (process.env["NODE_ENV"] === "test") {
	dotenv.config({ path: path.join(root, ".env.test") });
} else {
	dotenv.config({ path: path.join(root, ".env") });
}

export class Configuration {
	static get<T extends string | number>(key: keyof IConfiguration): T {
		return this.configVars[key] as T;
	}

	private static getEnvVar(key: string): string {
		if (process.env["NODE_ENV"] !== "test" && process.env[key] === undefined) {
			throw new Error(`Config: missing environment variable ${key}`);
		}
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
		KafkaServer: this.getEnvVar("KAFKA_SERVER"),
		KafkaClientId: this.getEnvVar("KAFKA_CLIENT_ID"),
	};
}

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
		ServiceId: this.getEnvVar("SERVICE_ID"),
		Port: Number(this.getEnvVar("PORT")),
		Host: this.getEnvVar("HOST"),
		KafkaServer: this.getEnvVar("KAFKA_SERVER"),
		KafkaClientId: this.getEnvVar("KAFKA_CLIENT_ID"),
		TelegramToken: this.getEnvVar("TELEGRAM_TOKEN")
	};
}

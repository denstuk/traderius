import { config } from "dotenv"

export interface ApplicationConfig {
	ENV: string,
	KAFKA_CLIENT_ID: string,
	KAFKA_BROKER: string
}

export class Config {
	static loadEnv(): void {
		config()
	}

	static get<T extends keyof ApplicationConfig>(key: T): ApplicationConfig[T] {
		return Config.getEnvVar(key);
	}

	private static getEnvVar(key: string): string {
		const envVar = process.env[key];
		if (!envVar) {
			throw new Error(`Config: Cannot get ${key} from .env`);
		}
		return envVar;
	}
}
Config.loadEnv()

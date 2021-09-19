export class Config {
	static get(key: string): string {
		return Config.store[key]
	}

	static store: Record<string, string> = {
		NODE_ENV: Config.loadEnv("NODE_ENV"),
		TELEGRAM_TOKEN: Config.loadEnv("TELEGRAM_TOKEN"),
	}

	private static loadEnv(key: string): string {
		const envVar = process.env[key]
		if (!envVar) {
			throw new Error(`Fatal Error: ${envVar} not provided`)
		}
		return envVar
	}
}

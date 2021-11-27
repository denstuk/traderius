import { BaseConfig } from "@traderius/common/lib/framework/config";

export class Config extends BaseConfig {
    static {
        Config.loadEnv();
    }

    private static configVars = {
        Env: super.getEnvVar("ENV"),
        RedisHost: super.getEnvVar("REDIS_HOST"),
        RedisPort: Number(super.getEnvVar("REDIS_PORT")),
        RedisPass: super.getEnvVar("REDIS_PASS"),
        ServiceId: super.getEnvVar("SERVICE_ID"),
        NewsRapidHost: super.getEnvVar("NEWS_RAPID_HOST"),
        NewsRapidKey: super.getEnvVar("NEWS_RAPID_KEY"),
        Secret: super.getEnvVar("SECRET"),
    }

    static get<T extends string | number>(key: keyof typeof this.configVars): T {
        return this.configVars[key] as T;
    }
}

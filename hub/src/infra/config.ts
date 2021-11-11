import { BaseConfig } from "@traderius/common/lib/framework/config";

const ConfigVars = {
    Env: "ENV",
} as const;

export class Config extends BaseConfig {
    static get(key: keyof typeof ConfigVars): string {
        return super.getEnvVar(ConfigVars[key]);
    }
}
Config.loadEnv();

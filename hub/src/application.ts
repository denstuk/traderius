import { Config } from "./infra/config";

export class Application {
    static async up(): Promise<void> {
        console.log(Config.get("Env"));
    }

    static async down(): Promise<void> {}
}

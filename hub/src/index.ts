import "reflect-metadata";
import "./infra/config";
import { Application } from "./application";

async function main(): Promise<void> {
    await Application.up();
    
    process.once("SIGINT", async () => await Application.down())
	process.once("SIGTERM", async () => await Application.down())
}
main().then();
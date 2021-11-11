import "reflect-metadata";
import {Application} from "./Application";

async function main(): Promise<void> {
	await Application.up()

	process.once("SIGINT", async () => await Application.down())
	process.once("SIGTERM", async () => await Application.down())
}
main().then()

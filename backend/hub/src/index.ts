import "reflect-metadata";
import "./infra/configuration/configuration";
import { ioc } from "./ioc";
import { Application } from "./application";

async function main(): Promise<void> {
	const application: Application = ioc.resolve(Application);
	await application.up();

	process.once("SIGINT", () => application.down().then(() => process.exit(0)));
	process.once("SIGTERM", () => application.down().then(() => process.exit(0)));
}
main().then();

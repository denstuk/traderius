import "./infra";
import { Application } from "./application";

async function main(): Promise<void> {
	await Application.up();

	process.once("SIGINT", () => Application.down().then(() => process.exit(0)));
	process.once("SIGTERM", () => Application.down().then(() => process.exit(0)));
}
main().then();

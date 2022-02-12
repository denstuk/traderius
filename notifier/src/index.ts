import "./infra/env";
import { Application } from "./application";

declare global {
	interface Error {
		message: string;
	}
}

function main(): Promise<void> {
	return Application.start();
}
main();

process.on("SIGINT", () => Application.stop());
process.on("SIGTERM", () => Application.stop());

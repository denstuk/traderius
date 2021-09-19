import "./infra/env"
import { Application } from "./Application"

function main(): Promise<void> {
	return Application.start()
}
main()

process.on("SIGINT", () => Application.stop())
process.on("SIGTERM", () => Application.stop())

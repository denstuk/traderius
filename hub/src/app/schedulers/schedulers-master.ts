import { AutomatedTradingScheduler } from "./automated-trading.scheduler";

export class SchedulersMaster {
	async up(): Promise<void> {
		await AutomatedTradingScheduler.run();
	}
}

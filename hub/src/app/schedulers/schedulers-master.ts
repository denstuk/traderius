import { AutomatedTradingScheduler } from "./automated-trading.scheduler";
import { ioc } from "../../infra";
import { AnalyzeStocksScheduler } from "./analyze-stocks.scheduler";

export class SchedulersMaster {
	static async up(): Promise<void> {
		//await AutomatedTradingScheduler.job();
		/*await Promise.all([
			ioc.resolve(AnalyzeStocksScheduler).run()
		]);*/
	}
}

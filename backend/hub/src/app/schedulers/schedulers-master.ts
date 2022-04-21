import { injectable } from "inversify";
import { AnalyzeStocksScheduler } from "./analyze-stocks.scheduler";
import { AutomatedTradingScheduler } from "./automated-trading.scheduler";
import { ioc } from "../../ioc";


@injectable()
export class SchedulersMaster {
	async start(): Promise<void> {
		await Promise.all([
			ioc.resolve(AnalyzeStocksScheduler).run(),
			ioc.resolve(AutomatedTradingScheduler).run(),
		]);
	}
}

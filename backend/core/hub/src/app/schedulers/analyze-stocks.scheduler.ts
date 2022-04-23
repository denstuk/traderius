import { ioc } from "../../ioc";
import { injectable } from "inversify";
import { Logger } from "../../infra";
import { StocksAnalysis } from "../../domain/analysis/stocks-analysis/stocks-analysis";
import { SchedulerBase } from "./scheduler.base";

@injectable()
export class AnalyzeStocksScheduler extends SchedulerBase {
	protected cronTime = "0 0 0 * * *";
	protected onStart = true;

	override async job(): Promise<void> {
		ioc.resolve(Logger).info("AnalyzeStocks: Job started");
		await ioc.resolve(StocksAnalysis).refreshMostProfitable();
		ioc.resolve(Logger).info("AnalyzeStocks: Job finished");
	}
}

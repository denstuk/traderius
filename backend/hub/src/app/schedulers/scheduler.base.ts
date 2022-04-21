import { CronJob } from "cron";
import { injectable } from "inversify";

@injectable()
export abstract class SchedulerBase {
	private cronJob: CronJob | undefined;

	protected abstract cronTime: string;
	protected abstract onStart: boolean;

	run(): void {
		this.cronJob = new CronJob(this.cronTime, this.job, null, false, "Europe/Moscow", null, this.onStart);
		this.cronJob.start();
	}

	abstract job(): Promise<void>;
}

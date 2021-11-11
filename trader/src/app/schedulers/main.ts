import cron from "cron"

export class Scheduler {
	private static cronJob: cron.CronJob | undefined

	static async start(): Promise<void> {
		Scheduler.cronJob = new cron.CronJob("* * * * * *", Scheduler.job, null, true, 'Europe/Moscow')
	}

	static async job(): Promise<void> {

	}
}

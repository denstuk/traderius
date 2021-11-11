import * as winston from 'winston';

export class Logger {
	private static logger = winston.createLogger({
		level: 'info',
		format: winston.format.combine(winston.format.colorize(), winston.format.simple()),
		transports: [
			new winston.transports.Console(),
			new winston.transports.File({ filename: ".log" })
		]
	})

	static info(message: string): void {
		this.logger.info(message)
	}

	static debug(message: string): void {
		this.logger.debug(message)
	}

	static error(message: string): void {
		this.logger.error(message)
	}
}

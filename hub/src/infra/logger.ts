import * as winston from 'winston';
import "winston-daily-rotate-file";
import { Config } from './config';
import path from "path";

export class Logger {
	private static logFormat = winston.format.printf((info: winston.Logform.TransformableInfo): string => {
		const now = new Date().toISOString();
		return `${now} ${Config.get<string>("ServiceId")} ${info.level.toUpperCase()} ${info.message}`
	});

	private static rotationTransport = new winston.transports.DailyRotateFile({
		filename: path.join(process.cwd(), '.log', 'app-%DATE%.log'),
		datePattern: 'YYYY-MM-DD-HH',
		zippedArchive: true,
		maxSize: '20m',
		maxFiles: '14d'
	});

	private static logger = winston.createLogger({
		level: Config.get<string>("Env") === "develop" ? 'http' : 'info',
		format: winston.format.combine(Logger.logFormat),
		transports: [
			new winston.transports.Console(),
			Logger.rotationTransport
		]
	});

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

import * as winston from "winston";
import "winston-daily-rotate-file";
import path from "path";
import { Configuration } from "./configuration";
import { AbstractConfigSetLevels } from "winston/lib/winston/config";
import { injectable } from "inversify";
import DailyRotateFile from "winston-daily-rotate-file";

export const DefaultLogLevels: AbstractConfigSetLevels = {
	FATAL: 0,
	ERROR: 1,
	WARNING: 2,
	INFO: 3,
	DEBUG: 4,
	TRACE: 5,
};

@injectable()
export class Logger {
	private readonly level = Configuration.get<string>("Env") === "develop" ? "TRACE" : "INFO";
	private readonly logger: winston.Logger;

	constructor() {
		this.logger = winston.createLogger({
			levels: DefaultLogLevels,
			level: this.level,
			transports: [this.getConsoleTransport(), this.getDailyRotateTransport()],
			format: this.getLogFormat(),
		});
	}

	private getDailyRotateTransport(): DailyRotateFile {
		return new winston.transports.DailyRotateFile({
			filename: path.join(process.cwd(), ".log", "app-%DATE%.log"),
			datePattern: "YYYY-MM-DD-HH",
			zippedArchive: true,
			maxSize: "20m",
			maxFiles: "14d",
		});
	}

	private getConsoleTransport(): winston.transports.ConsoleTransportInstance {
		return new winston.transports.Console();
	}

	private getLogFormat(): winston.Logform.Format {
		return winston.format.printf((info: winston.Logform.TransformableInfo): string => {
			const now = new Date().toISOString();
			return `${now} ${Configuration.get<string>("ServiceId")} ${info.level.toUpperCase()} ${info.message}`;
		});
	}

	trace(message: string): void {
		this.logger.log("TRACE", message);
	}

	debug(message: string): void {
		this.logger.log("DEBUG", message);
	}

	info(message: string): void {
		this.logger.log("INFO", message);
	}

	warning(message: string): void {
		this.logger.log("WARNING", message);
	}

	error(message: string): void {
		this.logger.log("ERROR", message);
	}

	fatal(message: string): void {
		this.logger.log("FATAL", message);
	}
}

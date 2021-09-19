import Pino from "pino"

export const Logger = Pino({
	prettyPrint: {
		colorize: true,
		errorLikeObjectKeys: ["err", "error"],
		levelFirst: false,
		messageKey: "msg",
		levelKey: "level",
		timestampKey: "time",
		translateTime: "SYS:standard",
		ignore: "pid,hostname",
		hideObject: false,
		singleLine: true,
	},
})

import { CommandType } from "./CommandType"

export abstract class Command<T> {
	abstract type: CommandType
	abstract run(data: T): Promise<void>
}

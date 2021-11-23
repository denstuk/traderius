import { CommandType } from "./commands/CommandType";
import { Command } from "./commands/Command";
import { SendMessagesCommand } from "./commands/SendMessagesCommand";
import { Bot } from "./Bot";

export class Factory {
	static get(type: CommandType): Command<unknown> {
		if (type === CommandType.SendMessages) {
			return new SendMessagesCommand(Bot.connection); // TODO:Feature remove .connection by GRASP
		}
		throw new Error(`unknown factory command`);
	}
}

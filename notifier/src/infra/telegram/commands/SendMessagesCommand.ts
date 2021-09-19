import { Command } from "./Command"
import { CommandType } from "./CommandType"
import TelegramBot from "node-telegram-bot-api"
import { getRepository } from "typeorm"
import { User } from "../../../domain/users/entities/User"

interface SendMessagesData {
	text: string
}

export class SendMessagesCommand extends Command<SendMessagesData> {
	type = CommandType.SendMessages

	constructor(private bot: TelegramBot) {
		super()
	}

	async run(data: SendMessagesData): Promise<void> {
		const users = await getRepository(User).find()
		for (const user of users) {
			await this.bot.sendMessage(user.chatId, data.text)
		}
	}
}

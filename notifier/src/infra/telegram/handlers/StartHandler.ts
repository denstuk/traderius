import TelegramBot, { Message } from "node-telegram-bot-api";
import { getRepository } from "typeorm";
import { User } from "../../../domain/users/entities/User";

export class StartHandler {
	static register(bot: TelegramBot): void {
		bot.onText(/\/start/, async (msg: Message): Promise<void> => {
			const chatId = msg.chat.id;
			const username = msg.chat.username;

			const existedUser = await getRepository(User).findOne({ chatId });
			if (!existedUser) {
				await getRepository(User).create({ chatId, username }).save();
			} else {
				await getRepository(User).update(existedUser.id, { username });
			}

			let message = `Hi, ${username}! I'm Traderius - Open-Source Software that provides `;
			message += `instruments to analyse, predict and manipulate with stocks (crypto) markets`;

			await bot.sendMessage(chatId, message);
		});
	}
}

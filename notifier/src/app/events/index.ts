import { Events } from "@traderius/common/lib/broker/Events"
import { Factory } from "../../infra/telegram/Factory"
import { CommandType } from "../../infra/telegram/commands/CommandType"

export default class EventsController {
	@Events.on("notifier.mailing")
	static async sendMessages(data: { text: string }): Promise<void> {
		const command = Factory.get(CommandType.SendMessages)
		return command.run(data)
	}
}

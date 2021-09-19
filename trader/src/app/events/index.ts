import { Events } from "@traderius/common/lib/broker/Events"

export default class EventsController {
	@Events.on("trader.buyAsset")
	static async buyStock(): Promise<void> {}

	@Events.on("trader.sellAsset")
	static async sellAsset(): Promise<void> {}
}

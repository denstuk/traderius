import {Events} from "../../infra/broker/decorators/Events";

export default class EventsController {
	@Events.on({
		topic: "trader.buyAsset",
		groupId: "Trader.BuyAsset"
	})
	static async buyStock(): Promise<void> {}

	@Events.on({
		topic: "trader.sellAsset",
		groupId: "Trader.SellAsset"
	})
	static async sellAsset(): Promise<void> {}
}

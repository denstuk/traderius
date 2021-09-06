import { Events } from "@traderius/common/lib/broker/Events"

export default class EventListener {
    @Events.on('trader.buyAsset')
    static async buyAsset(data: unknown): Promise<void> {}

    @Events.on('trader.sellAsset')
    static async sellAsset(data: unknown): Promise<void> {}
}
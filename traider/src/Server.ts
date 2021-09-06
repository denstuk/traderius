import { Events } from "@traderius/common/src/broker/Events"
import { Broker } from "@traderius/common/src/broker/Broker"

function sleep(ms: number): Promise<void> {
    return new Promise((res, _) => {
        setTimeout(() => {
            res()
        }, ms)
    })
}

export default class Listener {
    @Events.on('traider.buyStock')
    static async buyStock(data: any): Promise<void> {
        console.log(data)
    }
}

export class Server {
    static async up(): Promise<void> {
        await sleep(3000)
        await Broker.connect()
        await Broker.listen()
        setInterval(async () => {
            await Broker.publish('traider.buyStock', { ticker: 'APPL', amount: 50 })
            await Broker.publish('traider.buyStock', [{ ticker: 'APPL', amount: 1 }, { ticker: 'YNDX', amount: 2 }])
        }, 2000)
    }
}
Server.up()
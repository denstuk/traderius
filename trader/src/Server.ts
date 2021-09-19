import { Broker } from "@traderius/common/lib/broker/Broker"

export class Server {
    static async up(): Promise<void> {
        await Broker.connect()
        await Broker.listen()

        // TODO:Development - delete after testing
        // setInterval(async () => {
        //     await Broker.publish('traider.buyStock', { ticker: 'APPL', amount: 50 })
        //     await Broker.publish('traider.buyStock', [{ ticker: 'APPL', amount: 1 }, { ticker: 'YNDX', amount: 2 }])
        // }, 2000)
    }
}
Server.up()

import { Broker } from "./infra/broker/Broker"

export class Server {
    static async up(): Promise<void> {
        await Broker.connect()
    }
}
Server.up()
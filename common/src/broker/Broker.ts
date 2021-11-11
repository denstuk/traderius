import { Kafka, Consumer, Producer } from "kafkajs"

export class Broker {
    private static kafka: Kafka
    private static consumer: Consumer
    private static producer: Producer
    private static handlers: Map<string, Function> = new Map<string, Function>()

    static async connect(brokers: string[]): Promise<void> {
        this.kafka = new Kafka({ brokers, clientId: "app" })

        this.consumer = this.kafka.consumer({ groupId: '2' })
        await this.consumer.connect()

        this.producer = this.kafka.producer()
        await this.producer.connect()

        for (const [key] of this.handlers) {
            await this.consumer.subscribe({ topic: key, fromBeginning: true })
        }
        await this.consumer.run({
            eachMessage: async ({ topic, partition, message }) => {
                const handler = this.handlers.get(topic)
                if (!handler) {
                    throw new Error('[Broker]: handler not found')
                }
                const parsedData: unknown = message.value ? JSON.parse(message.value.toString()) : undefined
                handler(parsedData)
            }
        })
    }

    static async subscribe(topic: string, handler: Function): Promise<void> {
        if (this.handlers.get(topic)) {
            throw new Error(`[Broker]: topic already used`)
        }
        this.handlers.set(topic, handler)
    }

    static async publish(topic: string, data?: unknown): Promise<void> {
        await this.producer.send({ topic, messages: [{
            value: data ? JSON.stringify(data) : null
        }]})
    }
}
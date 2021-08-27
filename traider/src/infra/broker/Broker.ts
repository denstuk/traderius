import { Kafka, Producer, Consumer } from 'kafkajs'

export class Broker {
    private static kafka: Kafka
    private static producer: Producer
    private static consumer: Consumer
    private static handlers: Map<string, Function> = new Map<string, Function>()

    static async connect(): Promise<void> {
        Broker.kafka = new Kafka({ clientId: 'my-app', brokers: ['kafka:29092'] })

        Broker.producer = Broker.kafka.producer()
        await Broker.producer.connect()

        Broker.consumer = Broker.kafka.consumer()
        await Broker.consumer.connect()
    }

    static async on(topic: string, cb: Function): Promise<void> {
        return this.consumer.subscribe({ topic, fromBeginning: true })
    }
}
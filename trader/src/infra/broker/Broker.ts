import {Kafka, Producer, EachMessagePayload,} from "kafkajs"
import {randomUUID} from "crypto";
import {Logger} from "../framework/logger";
import {Config} from "../framework/config";

export interface Subscription {
	topic: string;
	groupId: string; // Max parallelism when single
}

export class Broker {
	private static kafka: Kafka
	private static producer: Producer

	static async connect(): Promise<void> {
		this.kafka = new Kafka({
			brokers: [Config.get("KAFKA_BROKER")],
			clientId: Config.get("KAFKA_CLIENT_ID"),
			logLevel: 0
		})
		const admin = this.kafka.admin()
		const description = await admin.describeCluster()
		console.log(description);

		this.producer = this.kafka.producer()
		await this.producer.connect()
	}

	static async publish(topic: string, data?: unknown[]): Promise<void> {
		if (!Broker.kafka) await Broker.connect()
		const dataPackage = serializeData(data)
		await Broker.producer.send({ topic, messages: [{ value: dataPackage }] })
	}

	static async subscribe(sub: Subscription, handler: Function): Promise<void> {
		if (!Broker.kafka) await Broker.connect()
		const consumer = Broker.kafka.consumer({ groupId: sub.groupId || randomUUID() })
		await consumer.connect()
		await consumer.subscribe({ topic: sub.topic })
		await consumer.run({
			eachMessage: async ({ topic, partition, message }: EachMessagePayload) => {
				Logger.debug(`Broker handled: ${topic} from ${partition} with message ${message.value}`)
				if (topic === sub.topic) {
					const data = deserializeData(message.value!.toString())
					await handler(data)
				}
			}
		})
		Logger.debug(`Broker subscribed to ${sub.topic} in ${sub.groupId}`)
	}
}

function serializeData(data?: unknown[]): string {
	return data ? JSON.stringify(data) : JSON.stringify([])
}

function deserializeData(data: string): unknown[] {
	return JSON.parse(data)
}

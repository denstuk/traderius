import { injectable } from "inversify";
import { Kafka, KafkaConfig, Producer } from "kafkajs";
import { Configuration } from "../configuration";
import { KafkaTopic } from "./kafka-client.types";

@injectable()
export class KafkaClientService {
	private readonly config: KafkaConfig = {
		brokers: [Configuration.get<string>("KafkaServer")],
		clientId: Configuration.get<string>("KafkaClientId"),
	};
	private producer: Producer | undefined;

	async connect(): Promise<void> {
		const kafka = new Kafka(this.config);
		this.producer = kafka.producer();
		await this.producer.connect();
	}

	async publish(topic: KafkaTopic, data: unknown): Promise<void> {
		if (!this.producer) throw new Error("Error: connection with Kafka refused");
		await this.producer.send({ topic, messages: [{ value: JSON.stringify(data) }] });
	}
}
